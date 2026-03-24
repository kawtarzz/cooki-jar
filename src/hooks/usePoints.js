// src/hooks/usePoints.js
import { useState, useCallback } from "react";

const API = "http://localhost:8088/api";

export function usePoints(user) { //, isGuest = false) {
 const [userPoints, setUserPoints] = useState(0);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 // Fetch current points from the API remove guest mode logic for now - will reintroduce if we decide to bring back guest mode for points
 const fetchPoints = useCallback(() => {
  // if (isGuest) {
  //  setUserPoints(25);
  //  return;
  // }

  setLoading(true);
  setError(null);

  fetch(`${API}/users/${user.id}`)
   .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch points");
    return res.json();
   })
   .then((data) => {
    setUserPoints(data.userPoints ?? 0);
   })
   .catch((err) => setError(err.message))
   .finally(() => setLoading(false));
 }, [user]); // , isGuest]);

 const awardPoints = useCallback((amount) => {
  // if (isGuest) {
  //  setUserPoints((prev) => prev + amount);
  //  return;
  // }

  setUserPoints((prev) => {
   const newTotal = prev + amount;

   fetch(`${API}/users/${user.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userPoints: newTotal }),
   }).catch((err) => {
    console.error("Failed to save points:", err);
    setUserPoints(prev);
   });

   return newTotal;
  });
 }, [user]); // , isGuest]);

 // Deduct points when a reward is redeemed
 const deductPoints = useCallback((amount) => {
  setUserPoints((prev) => {
   if (prev < amount) {
    throw new Error("Not enough points");
   }

   const newTotal = prev - amount;

   // if (!isGuest) {
   //  fetch(`${API}/users/${user.id}`, {
   //   method: "PATCH",
   //   headers: { "Content-Type": "application/json" },
   //   body: JSON.stringify({ userPoints: newTotal }),
   //  }).catch((err) => {
   //   console.error("Failed to deduct points:", err);
   //   setUserPoints(prev); // roll back
   //  });
   // }

   return newTotal;
  });
 }, [user]);

 const canAfford = (cost) => userPoints >= cost;

 return {
  userPoints,
  loading,
  error,
  fetchPoints,
  awardPoints,
  deductPoints,
  canAfford,
 };
}