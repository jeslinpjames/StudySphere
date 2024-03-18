import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSave = () => {
    // Implement your save logic here

    // Check if passwords match
    if (password === confirmPassword) {
      // Save logic here
      console.log('Saving changes:', { name, email, password });
      setIsEditing(false);
      setConfirmPassword('');
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white w-1/3 mt-10 rounded-lg">
          <div className="flex items-center justify-center pt-10">
            <img
              alt="Profile Picture"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              className="rounded-full w-32"
            />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {isEditing && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {!passwordMatch && (
                  <p className="text-red-500 mt-2">Passwords do not match.</p>
                )}
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (!isEditing) {
                    setConfirmPassword('');
                    setPasswordMatch(true);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;