"use client";

import { useEffect, useState } from "react";
import { getCompletedAddresses } from "@/utils/imageProcessing";

// Define types for the API response
interface ApiResponse {
  extractedText: string;
  completedAddresses: string[];
}



export default function AddressSelector() {
  const [selectedAddress, setSelectedAddress] = useState("");
//   const [extractedText, setExtractedText] = useState<string>("");
    const [completedAddresses, setCompletedAddresses] = useState<string[]>([]);
  
    useEffect(() => {
        const addresses = getCompletedAddresses();
        setCompletedAddresses(addresses);
    }, []);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 mt-27 mb-27">
      <h2 className="text-xl font-semibold">Select an Address</h2>
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
                  name="address"
                  value={address}
                  onChange={(e) => setSelectedAddress(e.target.checked ? address : "")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAddress && (
        <div className="mt-4 w-full max-w-md border p-4 rounded-md shadow">
          <h3 className="text-lg font-medium">Selected Address:</h3>
          <p className="text-gray-700">{selectedAddress}</p>
        </div>
      )}
    </div>
  );
}
