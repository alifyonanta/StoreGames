import { useRouter } from "next/router";
import Footer from "./Footer"
import MenuItem from "./MenuItem"
import Profile from "./Profile"
import Cookies from 'js-cookie';

interface SideBarProps {
  activeMenu:'overview' | 'transactions' | 'settings';
}
export default function SideBar(props: SideBarProps) {
  const {activeMenu} = props;
  const router = useRouter();
  const onLogOut = () => {
    Cookies.remove('token');
    router.push('/sign-in');
  }
  return (
    <section className="sidebar">
    <div className="content pt-50 pb-30 ps-30">
      <Profile />
      <div className="menus">
        <MenuItem title="Overview" icon="ic-menu-overview" active={activeMenu === 'overview'} href="/member"/>
        <MenuItem title="Transaction" icon="ic-menu-transaction" active={activeMenu === 'transactions'} href="/member/transactions"/>
        <MenuItem title="Messages" icon="ic-menu-messages" href="/member"/>
        <MenuItem title="Card" icon="ic-menu-card"  href="/member"/>
        <MenuItem title="Reward" icon="ic-menu-reward"  href="/member"/>
        <MenuItem title="Setting" icon="ic-menu-setting" active={activeMenu === 'settings'}  href="/member/edit-profile"/>
        <MenuItem title="Log Out" icon="ic-menu-logout"  onClick={onLogOut}/>
        <Footer />
      </div>
    </div>
  </section>
  )
}
