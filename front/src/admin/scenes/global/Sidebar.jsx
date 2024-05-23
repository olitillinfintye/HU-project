import { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import {useNavigate, Link} from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import avatar_img1 from '../../../assets/img_avatar.png'
import { IoLogOut } from "react-icons/io5";
import { MdArrowForwardIos} from "react-icons/md";

import ip from "../../../helpers/Config.js";
import axios from "axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [name, setName] = useState("");
  const [senderType, setSenderType] = useState("");
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState]=useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/api/user")
      .then((res) => {
        if (res.data.status === "Success") {
          setName(res.data.user.user);
          if (res.data.user.user.hasOwnProperty("adminId")) {
            setSenderType("Admin");
            setUserType("admin");
            setUserId(res.data.user.user.adminId);
          }
        } else {
          setName("Something went wrong");
        }
      })
      .catch((error) => {
        setName("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    if (!loading && !senderType) {
      window.location.href = "/";
    }
  }, [loading, senderType]);
  if (loading) {
    return <div>Loading...</div>;
  }

  // axios.defaults.withCredentials = true;
  const logout = () => {
		axios.get('http://localhost:3000/api/logout')
        .then(res => {
            if(res.data.message === "Success"){
				setAuthState(false);
				navigate('/');
            }
            else{
				alert("error");
            } 
        })
		.catch (err => console.log(err))
	};
  
  let Staff_img = '';
  let user_image =name.picture;
    if (user_image === null || user_image === undefined) {
        Staff_img = avatar_img1;
    } else {
        Staff_img = user_image.replace('Images', '');
        Staff_img = `http://localhost:3000${Staff_img}`;
    }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="top-left"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Staff_img}style={{
                    cursor: "pointer",
                    borderRadius: "20%",
                    borderColor: "red",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.3s",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name.fullname}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  astu-IF Admin
                </Typography>

              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Post Management
            </Typography>
            <Item
              title="Delete Post"
              to="/admin/delete"
              icon={<DeleteOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users Management
            </Typography>
            <Item
              title="Ban or Approve"
              to="/admin/banapprove"
              icon={<CheckCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Add
            </Typography>
            <Item
              title="Add School&Dep"
              to="/admin/addsd"
              icon={<SchoolOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add category"
              to="/admin/category"
              icon={<CategoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          <Button
                onClick={logout}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  align:'right'
                }}
              >
                 <p>Logout</p>
          </Button>
          </Box>

          
          
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
