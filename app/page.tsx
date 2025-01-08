"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function AuthPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Next.js の useRouter フック

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // ログイン中のユーザーのメールアドレスを取得
        router.push("/meetings"); // ユーザーがログイン中なら /meetings にリダイレクト
      } else {
        setUserEmail(null); // 未ログインの場合
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, [router]);

  const handleSignUp = async () => {
    try {
      setError(null); // エラーをリセット
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/meetings"); // サインアップ成功後に /meetings に移動
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
    }
  };

  const handleSignIn = async () => {
    try {
      setError(null); // エラーをリセット
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/meetings"); // サインイン成功後に /meetings に移動
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-out failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        {userEmail ? "Welcome" : "Sign In / Sign Up"}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!userEmail ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-gray-700 mb-4">
            Logged in as <strong>{userEmail}</strong>
          </p>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
