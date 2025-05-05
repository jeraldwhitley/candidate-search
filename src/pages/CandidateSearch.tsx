// import React, { useState } from "react";

// interface GithubUser {
//   login: string;
//   id: number;
//   avatar_url: string;
//   html_url: string;
// }

// const CandidateSearch: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<GithubUser[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!query) return;

//     setLoading(true);
//     setError("");

//     try {
//       console.log("TOKEN:", import.meta.env.VITE_GITHUB_TOKEN);
//       const res = await fetch(`https://api.github.com/search/users?q=${query}`, {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch GitHub users.");

//       const data = await res.json();
//       setResults(data.items || []);
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while searching.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveCandidate = (candidate: GithubUser) => {
//     const saved: GithubUser[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
//     const exists = saved.some((c) => c.id === candidate.id);
//     if (!exists) {
//       saved.push(candidate);
//       localStorage.setItem("savedCandidates", JSON.stringify(saved));
//     }
//   };

//   const isSaved = (id: number): boolean => {
//     const saved: GithubUser[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
//     return saved.some((c) => c.id === id);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Candidate Search</h1>
//       <input
//         className="border p-2 mr-2"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         placeholder="Search GitHub users..."
//       />
//       <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
//         Search
//       </button>

//       {loading && <p className="mt-4 text-gray-600">Loading...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       <ul className="mt-4 space-y-2">
//         {results.map((user) => (
//           <li key={user.id} className="border p-3 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <img src={user.avatar_url} alt={`${user.login} avatar`} className="w-10 h-10 rounded-full" />
//               <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
//                 {user.login}
//               </a>
//             </div>
//             <button
//               disabled={isSaved(user.id)}
//               onClick={() => saveCandidate(user)}
//               className={`px-3 py-1 rounded ${
//                 isSaved(user.id) ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:text-green-800"
//               }`}
//             >
//               {isSaved(user.id) ? "Saved" : "Save"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CandidateSearch;

// =======

import React, { useState } from "react";

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

const CandidateSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch GitHub users.");

      const data = await res.json();
      const usersWithDetails = await Promise.all(
        data.items.map(async (user: any) => {
          const userDetailsRes = await fetch(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          });

          if (!userDetailsRes.ok) {
            throw new Error(`Failed to fetch details for ${user.login}`);
          }

          const userDetails = await userDetailsRes.json();
          return {
            ...user,
            location: userDetails.location || "N/A",
            email: userDetails.email || "N/A",
            company: userDetails.company || "N/A",
            bio: userDetails.bio || "N/A",
          };
        })
      );
      setResults(usersWithDetails);
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = (candidate: GithubUser) => {
    const saved: GithubUser[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const exists = saved.some((c) => c.id === candidate.id);
    if (!exists) {
      saved.push(candidate);
      localStorage.setItem("savedCandidates", JSON.stringify(saved));
    }
  };

  const isSaved = (id: number): boolean => {
    const saved: GithubUser[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    return saved.some((c) => c.id === id);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 bg-white text-black p-4 shadow-md">Candidate Search</h1>
      <input
        className="border p-2 mr-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search GitHub users..."
      />
      <button onClick={handleSearch} className="bg-blue-500 text-black px-4 py-2">
        Search
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <table className="mt-4 w-full table-auto border-collapse">
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
          {results.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="w-12 h-12 rounded-full"
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
                  disabled={isSaved(user.id)}
                  onClick={() => saveCandidate(user)}
                  className={`px-3 py-1 rounded ${
                    isSaved(user.id)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:text-green-800"
                  }`}
                >
                  {isSaved(user.id) ? "Saved" : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateSearch;
