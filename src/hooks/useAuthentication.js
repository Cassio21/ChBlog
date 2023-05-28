// import { db } from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //! CLEANUP
  //! DEAL WITH MEMORY LEAK
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //* CRIANDO O USUÁRIO NO SISTEMA
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage =
          'Senha inválida, deve conter pelo menos 6 caracteres';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  //* FIM CRIANDO O USUÁRIO NO SISTEMA

  //! CRIANDO  A SAÍDA DO USER
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };
  //! FIM CRIANDO A SAÍDA DO USER

  //? CRIANDO O LOGIN
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'E-mail ou senha incorretos';
      } else {
        systemErrorMessage = 'Ocorreu um erro. Por favor tente mais tarde.';
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};
