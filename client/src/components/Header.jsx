import { Moon, School } from "lucide-react";


const Header = () => {
  return (
    <nav>
      <div>
        <School />
        <h1>E-Learning</h1>
      </div>
      <ul>
        <li>Login</li>
        <li>Signup</li>
        <li>
          <Moon/>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Header