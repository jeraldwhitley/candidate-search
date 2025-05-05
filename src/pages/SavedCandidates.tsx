// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;

// import React, { useEffect, useState } from "react";

// const SavedCandidates: React.FC = () => {
//   const [saved, setSaved] = useState<any[]>([]);

//   useEffect(() => {
//     const savedList = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
//     setSaved(savedList);
//   }, []);

//   const removeCandidate = (id: number) => {
//     const updated = saved.filter((c) => c.id !== id);
//     localStorage.setItem("savedCandidates", JSON.stringify(updated));
//     setSaved(updated);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Saved Candidates</h1>
//       {saved.length === 0 ? (
//         <p>No saved candidates yet.</p>
//       ) : (
//         <ul className="space-y-2">
//           {saved.map((user) => (
//             <li key={user.id} className="border p-3 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <img src={user.avatar_url} alt="avatar" className="w-10 h-10 rounded-full" />
//                 <a href={user.html_url} target="_blank" rel="noopener noreferrer">
//                   {user.login}
//                 </a>
//               </div>
//               <button
//                 onClick={() => removeCandidate(user.id)}
//                 className="text-red-600"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SavedCandidates;

import React, { useEffect, useState } from "react";

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const SavedCandidates: React.FC = () => {
  const [saved, setSaved] = useState<GithubUser[]>([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSaved(savedList);
  }, []);

  const removeCandidate = (id: number) => {
    const updated = saved.filter((c) => c.id !== id);
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
    setSaved(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Saved Candidates</h1>
      {saved.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Bio</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {saved.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {user.login}
                  </a>
                </td>
                <td className="border px-4 py-2">{user.location}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.company}</td>
                <td className="border px-4 py-2">{user.bio}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeCandidate(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
