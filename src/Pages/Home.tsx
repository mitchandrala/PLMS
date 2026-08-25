import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes/routes";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center max-h-screen gap-5 w-full h-170">
      <div className="flex flex-col items-center gap-5">
        <div>
          <h1 className="text-3xl">Welcome to PLMS</h1>
        </div>
        <div>
          <Button onClick={() => navigate(ROUTES.DASHBOARD)}>Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
