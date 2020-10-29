import React from "react";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import {makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { PanelMenu } from "primereact/panelmenu";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {setMenuState} from "../actions/layout";

import Logo from "../public/cr-logo.png";
import {globals} from "../globals";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const drawerWidth = globals.menuWidth;

const useStyles = makeStyles((theme) => ({
	root: {
		fontFamily: "Rubik, san-serif"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(0.5)
	},
	menuIcon: {
		height: 36,
		width: 36
	},
	headerLogo:{
		height: "44px",
		marginRight: theme.spacing(1),
	},
	hide: {
		display: "none",
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
			alignItems: "center"
		},
	},
	titleLink: {
		textDecoration: "none",
		color: "inherit"
	},
	inputRoot: {
		color: "inherit",
	},
	sectionDesktop: {
		display: "flex",
		// [theme.breakpoints.up("sm")]: {
		// 	display: "flex",
		// },
	},
}));



const HeaderWithMenu = ({dispatch, isAuthenticated}) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// //TODO: move this to utils if needed
	const handleLogout = () => {
		cookies.remove("Authorization");
		history.push("/login");
	};

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
		dispatch(setMenuState(true));
	};

	const handleDrawerClose = () => {
		setOpen(false);
		dispatch(setMenuState(false));
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>My Account</MenuItem>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);

	const items = [{
		label: "1. Form Collaborative Planning Team",
		items: [{
			label: "1-1 Identify leader",
			icon: "pi pi-user-plus",
			command: () => {
				window.location = "/create-team";
			}
		},
		{
			label: "1-2 Identify team members",
			icon: "pi pi-users",
			url: "https://google.com"
		}
		]
	},
	{
		label: "2. Understanding the Situation",
		items: [{
			label: "2-3 Characterize social functions",
			icon: "pi pi-fw pi-cog",
			command: () => {
				window.location.hash = "/";
			}
		},
		{
			label: "2-4. Characterize built environment",
			icon: "pi pi-sliders-v",
			command: () => {
				window.location = "/set-built-environment";
			}
		},
		{
			label: "2-5. Link social functions & built environment",
			icon: "pi pi-chart-line"
		}
		]
	},
	{
		label: "3. Determine Goals & Objectives",
		items: [{
			label: "3-3: Define community hazards",
			icon: "pi pi-compass",
			command: () => {
				window.location.hash = "/";
			}
		},
		{
			label: "3-4: Determine anticipated performance",
			icon: "pi pi-sliders-h",
			command: () => {
				window.location = "/determine-anticipated-performance";
			}
		},
		{
			label: "3-5: Summarize the results",
			icon: "pi pi-chart-line"
		}
		]
	}
	];

	return (
		<div className={classes.grow}>
			<CssBaseline/>
			<AppBar position="relative" color="transparent"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={isAuthenticated ? clsx(classes.menuButton, open && classes.hide) : classes.hide}
					>
						<MenuIcon className={classes.menuIcon} />
					</IconButton>

					<a href="/" className={classes.titleLink}>
						<Typography className={classes.title} variant="h6" noWrap>
							<img src={Logo} className={classes.headerLogo} alt="Community Resilience"/>
							<span>
								CORE Playbook
							</span>
						</Typography>
					</a>

					<div className={classes.grow} />
					<div className={isAuthenticated ? classes.sectionDesktop: classes.hide}>
						<IconButton aria-label="show messages" color="inherit">
							<Badge badgeContent={2} color="primary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show notifications" color="inherit">
							<Badge badgeContent={5} color="primary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>

				</Toolbar>
			</AppBar>
			{renderMenu}

			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton> <br/>
					<Divider/>
				</div>
				<PanelMenu model={items} />
				<Divider />
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			 />

		</div>
	);
};

export default connect()(HeaderWithMenu);
