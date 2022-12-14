import SideBar from "../../../components/organisms/SideBar";
import TransactionsContent from "../../../components/organisms/TransactionsContent";
import { JWTPayloadTypes, UserTypes } from "../../../services/data-types";
import jwtDecode from "jwt-decode";

export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
        <SideBar activeMenu="transactions"/>
        <TransactionsContent />

    </section>
  )
}
interface GetServerSideProps {
  req: {
    cookies : {
      token: string;
    }
  }
}

export async function getServerSideProps({req} : GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };  
}