import { Link, useMatch, useNavigate } from "react-router-dom";

// to add color on active links
function DashBoard() {
  const navigate = useNavigate();
  function handleLogout() {
    // Perform any logout-related tasks here (e.g., clearing user data)
    // Then navigate to the login page
    navigate("/login");
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "bg-blue-300" : "";
  };

  // returns navbar with links and profile
  return (
    <>
      <div className="navbar bg-base-100 pt-3 bg-blue-400 text-black">
        <div className="flex-1">
          <Link
            className={`btn btn-ghost text-xl hover:bg-blue-300 m-2 ${isActive(
              "/home"
            )}`}
            to="/home"
          >
            Home
          </Link>
          <Link
            className={`btn btn-ghost text-xl hover:bg-blue-300 m-2 ${isActive(
              "/flashcards"
            )}`}
            to="/flashcards"
          >
            Post Cards
          </Link>
          <Link
            className={`btn btn-ghost text-xl hover:bg-blue-300 m-2 ${isActive(
              "/notes"
            )}`}
            to="/notes"
          >
            Notes
          </Link>
          <Link
            className={`btn btn-ghost text-xl hover:bg-blue-300 m-2 ${isActive(
              "/quiz"
            )}`}
            to="/quiz"
          >
            Quiz
          </Link>
          <Link
            className={`btn btn-ghost text-xl hover:bg-blue-300 m-2 ${isActive(
              "/chatpdf"
            )}`}
            to="/chatpdf"
          >
            ChatPdf
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-15 rounded-full border-2 border-stone-300">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 bg-blue-400 text-black border-2 border-stone-300	"
            >
              <li>
              <Link className="hover:bg-blue-300" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="hover:bg-blue-300"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
