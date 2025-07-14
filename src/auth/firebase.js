import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNf4j4OKz6ANw7lgcUVhRjiLHkCWEYCOc",
  authDomain: "suenosydisenos.firebaseapp.com",
  projectId: "suenosydisenos",
  storageBucket: "suenosydisenos.firebasestorage.app",
  messagingSenderId: "111121902709",
  appId: "1:111121902709:web:01bf2062ba23c04b7cdc3c"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// AUTENTICACIÓN DE USUARIOS FIREBASE //

const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.useDeviceLanguage()

export async function crearUsuario(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    return result.user;
  } catch (error) {
    throw error;
  }
}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                res(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}

// BASE DE DATOS FIRESTORE //

export const db = getFirestore(app);

export function createProduct(product) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "productosSyD"), {
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description
        });

        res(docRef)

        } catch (e) {
        rej(e)
        }
    });
}

export function editProduct(product){
    return(
        new Promise(async (res, rej) => {
            try{
                await setDoc(doc(db, "productosSyD", product.id), {
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    description: product.description
                })
                console.log("Document written ");
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }
        })
    )
}

export function deleteProduct(id){
    return(
        new Promise(async(res, rej) => {
            try{
                await deleteDoc(doc(db, "productosSyD", id))
                res()
            }catch (e){
                rej(e)
            }

        })
    )
}

export function getProducts() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "productosSyD"));
                                        
                    const results = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            description: data.description
                        };
                    });
                    console.log("Datos traídos de Firestore:", results);
                    res (results);
                } catch (error) {
                    rej (error);
                }
        })
    )
}

export function getProductInFb(id) {
    return(
        new Promise(async (res, rej) => {
                try {
                    const docRef = doc(db, "productosSyD", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const producto = {
                            id: docSnap.id,
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            description: data.description
                        }
                        res(producto)
                    } else {
                    // docSnap.data() will be undefined in this case
                        rej("No such document!")
                    }
                } catch (error) {
                    rej (error);
                }
        })
    )
}


