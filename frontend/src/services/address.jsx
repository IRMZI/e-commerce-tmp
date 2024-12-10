import { useState } from "react";

export default function addressServices() {
  const [addressLoading, setAddressLoading] = useState(false);
  const url = "http://localhost:3000/users";

  const updateUserAddress = (userId, addressData) => {
    setAddressLoading(true);
    return fetch(`${url}/${userId}/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(addressData),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAddressLoading(false);
      });
  };

  return { updateUserAddress, addressLoading };
}
