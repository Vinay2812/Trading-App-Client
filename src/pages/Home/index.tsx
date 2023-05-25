import { FC } from "react";
import { Sidebar } from "../Admin/components";

interface HomeProps {}

const Home: FC<HomeProps> = (props) => {
  return <Sidebar>
    User Home
  </Sidebar>;
};

export default Home;
