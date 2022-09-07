import {
  Button,
  IconButton,
  Input,
  ButtonProps,
  Menu,
  Switch,
  Badge,
  Avatar,
} from '@mui/material';
import Link from 'next/link';
import { FC, MouseEventHandler, ReactNode, useState } from 'react';
import { FiChevronDown, FiSearch, FiSettings } from 'react-icons/fi';
import {
  AiOutlineCodepen,
  AiOutlineNotification,
  AiOutlineCode,
  AiOutlineHeart,
  AiOutlineFire,
} from 'react-icons/ai';
import {
  RiUser6Line,
  RiLogoutBoxRLine,
  RiEmotionLaughLine,
} from 'react-icons/ri';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useModal } from 'hooks';
import { WithChildren } from 'next-env';
import { authSelector } from 'store/reducers/auth';

const AppHeaderNav = styled.nav`
  background-color: ${props => props.theme.primary};
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  box-shadow: 0 0 2px grey;

  @media (max-width: 750px) {
    padding: 12px;
  }
`;

const NavbarButton: typeof Button = styled(Button)`
  color: ${props => props.theme.primaryLight} !important;
  padding: 0.5rem 1rem !important;
  text-transform: none !important;
  font-size: 1rem !important;
`;

const SearchInput = styled(Input)`
  width: 30%;
  margin-inline: auto;
  color: ${props => props.theme.primaryLight} !important;
  padding: 0.5rem;

  &::before {
    display: none;
  }

  &::after {
    border-bottom: 2px solid ${props => props.theme.primaryLight} !important;
    height: 100%;
  }
`;

const SearchIcon = styled(FiSearch)`
  color: ${props => props.theme.primaryLight};
  margin-right: 0.5rem;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  max-height: 30rem;
  padding: 0.5rem 1rem;
`;

const MenuButton: typeof Button = styled(Button)`
  justify-content: left !important;
  padding: 1rem !important;

  &:hover {
    background-color: ${props => props.theme.primaryLight} !important;
    color: ${props => props.theme.primaryDark} !important;
  }
`;

interface DropdownProps {
  label: ReactNode;
}
const DropdownMenu: FC<WithChildren & ButtonProps & DropdownProps> = ({
  children,
  endIcon,
  label,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <NavbarButton
        variant="text"
        color="inherit"
        endIcon={endIcon}
        onClick={onClick}>
        {label}
      </NavbarButton>
      <Menu open={!!anchorEl} onClose={onClose} anchorEl={anchorEl}>
        <DropdownList>{children}</DropdownList>
      </Menu>
    </>
  );
};

const AppHeader: FC = () => {
  const { open } = useModal();

  const auth = useSelector(authSelector);

  const onLogin: MouseEventHandler = () => {
    open(<h2>Hi</h2>);
  };

  return (
    <AppHeaderNav>
      <Link href="/">
        <IconButton color="primary">
          <AiOutlineCodepen color="#83e1f0" size={36} />
        </IconButton>
      </Link>

      <DropdownMenu endIcon={<FiChevronDown />} label="Communities">
        <Link href="/r/programmerhumor">
          <MenuButton fullWidth startIcon={<AiOutlineCode />}>
            r/ProgrammerHumor
          </MenuButton>
        </Link>
        <Link href="/r/funny">
          <MenuButton fullWidth startIcon={<RiEmotionLaughLine />}>
            r/funny
          </MenuButton>
        </Link>
        <Link href="/r/humansbeingbros">
          <MenuButton fullWidth startIcon={<AiOutlineHeart />}>
            r/HumansBeingBros
          </MenuButton>
        </Link>
        <Link href="/r/publicfreakout">
          <MenuButton fullWidth startIcon={<AiOutlineFire />}>
            r/PublicFreakout
          </MenuButton>
        </Link>
      </DropdownMenu>

      <SearchInput
        placeholder="Search Charm.."
        startAdornment={<SearchIcon size={24} />}
      />

      {auth.isAuthorized ? (
        <DropdownMenu
          endIcon={<FiChevronDown />}
          label={
            <Avatar
              sx={{ backgroundColor: '#83e1f0', height: 36, width: 36 }}
              src={auth.profileImage}>
              {auth.userName.charAt(0)}
            </Avatar>
          }>
          <MenuButton fullWidth startIcon={<AiOutlineNotification />}>
            Online Status
            <Switch checked={auth.onlineStatus} sx={{ marginLeft: 'auto' }} />
          </MenuButton>
          <MenuButton
            fullWidth
            startIcon={
              <Badge
                variant="dot"
                color="primary"
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <MdOutlineNotificationsActive />
              </Badge>
            }>
            Notifications
          </MenuButton>
          <Link href="/">
            <MenuButton fullWidth startIcon={<RiUser6Line />}>
              Profile
            </MenuButton>
          </Link>
          <Link href="/">
            <MenuButton fullWidth startIcon={<FiSettings />}>
              Settings
            </MenuButton>
          </Link>

          <Link href="/">
            <MenuButton fullWidth startIcon={<RiLogoutBoxRLine />}>
              Logout
            </MenuButton>
          </Link>
        </DropdownMenu>
      ) : (
        <IconButton color="primary" onClick={onLogin}>
          <RiUser6Line color="#83e1f0" size={24} />
        </IconButton>
      )}
    </AppHeaderNav>
  );
};

export default AppHeader;
