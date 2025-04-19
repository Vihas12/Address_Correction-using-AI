"use client";

import { useEffect, useState } from "react";
import { getCompletedAddresses, getImageUrl } from "@/utils/imageProcessing";
import Link from "next/link";

export default function AddressSelector() {
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
  const [completedAddresses, setCompletedAddresses] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [storeStatus, setStoreStatus] = useState<string>("");

  useEffect(() => {
    const addresses = getCompletedAddresses();
    setCompletedAddresses(addresses);
    const url = getImageUrl();
    setImageUrl(url);
  }, []);

  const handleAddressToggle = (address: string) => {
    setSelectedAddresses((prevSelected) =>
      prevSelected.includes(address)
        ? prevSelected.filter((a) => a !== address)
        : [...prevSelected, address]
    );
  };

  const handleStore = async () => {
    if (!imageUrl || selectedAddresses.length === 0) {
      setStoreStatus("No image or address selected.");
      return;
    }

    try {
      const res = await fetch("/api/addressdb", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressUrl: imageUrl,
          correctAddress: selectedAddresses,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to store correct address");
      }

      setStoreStatus("Address stored successfully!");
    } catch (err) {
      setStoreStatus("Error storing address.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 mt-27 mb-27">
      <h2 className="text-xl font-semibold">Select Address</h2>
      <table className="border-collapse border border-gray-300 w-full max-w-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Address</th>
            <th className="border p-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {completedAddresses.map((address, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{address}</td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedAddresses.includes(address)}
                  onChange={() => handleAddressToggle(address)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAddresses.length > 0 && (
        <div className="mt-4 w-full max-w-md border p-4 rounded-md shadow">
          <h3 className="text-lg font-medium">Selected Addresses:</h3>
          <ul className="text-gray-700 list-disc list-inside">
            {selectedAddresses.map((addr, i) => (
              <li key={i}>{addr}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700"
          onClick={handleStore}
        >
          Store Selected
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600">
          <Link href="/cam">Complete Address</Link>
        </button>
      </div>

      {storeStatus && <p className="text-sm mt-2">{storeStatus}</p>}
    </div>
  );
}
