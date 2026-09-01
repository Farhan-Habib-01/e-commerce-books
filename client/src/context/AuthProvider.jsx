import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // CREATE USER
  // =========================================

  const createUser = async (
    name,
    email,
    password,
  ) => {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    // Save display name in Firebase
    if (result.user) {
      await updateProfile(result.user, {
        displayName: name,
      });
    }

    return result;
  };

  // =========================================
  // LOGIN
  // =========================================

  const login = async (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // =========================================
  // GOOGLE LOGIN
  // =========================================

  const loginWithGoogle = async () => {
    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // =========================================
  // LOGOUT
  // =========================================

  const logOut = async () => {
    return signOut(auth);
  };

  // =========================================
  // GET TOKEN
  // =========================================

  const getIdToken = async (
    forceRefresh = false
  ) => {
    if (!auth.currentUser) {
      return null;
    }

    return auth.currentUser.getIdToken(
      forceRefresh
    );
  };

  // =========================================
  // AUTH STATE
  // =========================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      login,
      loginWithGoogle,
      logOut,
      getIdToken,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;