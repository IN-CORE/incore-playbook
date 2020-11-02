import React from "react";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import {makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
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

import {setMenuState} from "../actions/layout";

import Logo from "../public/cr-logo.png";
import {globals} from "../globals";
import Cookies from "universal-cookie";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";


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
	parentMenu: {
		fontWeight: 500,
		backgroundColor: "rgba(0, 97, 157, 0.1)",
		textTransform: "capitalize"
	}
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

	let openSubMenu = "1-1";
	let openMenu = 1;

	if(sessionStorage.getItem("menu")){
		openSubMenu = sessionStorage.getItem("menu");
		openMenu = openSubMenu.split("-")[0];
	}



	if(openMenu === null || openMenu === undefined){
		openMenu = "1";
	}

	let [open, setOpen] = isAuthenticated ? React.useState(true): React.useState(false);

	const [openTask, setOpenTask] = React.useState(openMenu);

	const handleDrawerOpen = () => {
		setOpen(true);
		dispatch(setMenuState(true));
	};

	const handleDrawerClose = () => {
		setOpen(false);
		dispatch(setMenuState(false));
	};

	const handleParentClick = (key) => () => {
		(openTask === key) ? setOpenTask("0"): setOpenTask(key);
	};

	const handleParentLoad = (key) => () => {
		(openTask === key) ? setOpenTask("0"): setOpenTask(key);
	};

	const handleSubmenuClick = (route) => () => {
		history.push(route);
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

	let treeData =  [
		{
			key: "1",
			label: "Form Collaborative Planning Team",
			nodes: [
				{
					key: "1-1",
					label: "Identify leader",
					completed: false,
					route: "/create-team"
				},
				{
					key: "1-2",
					label: "Identify Team Members",
					completed: true,
					disabled: true
				},
				{
					key: "1-3",
					label: "Establish the scope",
					completed: true,
					disabled: true
				},
				{
					key: "1-4",
					label: " Identify key stakeholders",
					completed: true,
					disabled: true
				},
			],
		},
		{
			key: "2",
			label: "Understanding the Situation",
			nodes: [
				{
					key: "2-1",
					label: "Assess existing community plans",
					completed: true,
					disabled: true
				},
				{
					key: "2-2",
					label: "Characterize community members",
					completed: true,
					disabled: true
				},
				{
					key: "2-3",
					label: "Characterize social functions",
					completed: true,
					disabled: true
				},
				{
					key: "2-4",
					label: "Characterize built environment",
					completed: false,
					disabled: false,
					route: "/set-built-environment"
				},
				{
					key: "2-5",
					label: "Link social functions & built environment",
					completed: true,
					disabled: true
				},
			],
		},
		{
			key: "3",
			label: "Determine Goals & Objectives",
			nodes: [
				{
					key: "3-1",
					label: "Identify long-term community goals",
					completed: true,
					disabled: true,
					route: "/define-community-hazards"
				},
				{
					key: "3-2",
					label: "Establish performance goals",
					completed: true,
					disabled: true,
					route: "/define-community-hazards"
				},
				{
					key: "3-3",
					label: "Define community hazards",
					completed: false,
					disabled: false,
					route: "/define-community-hazards"
				},
				{
					key: "3-4",
					label: "Determine anticipated performance",
					completed: false,
					route: "/determine-anticipated-performance"
				},
				{
					key: "3-5",
					label: "Summarize the results",
					completed: true,
					disabled: true,
					route: "/define-community-hazards"
				},
			],
		},
		{
			key: "4",
			label: "Plan Development",
			nodes: [
				{
					key: "4-1",
					label: "Evaluate Gaps",
					completed: true,
					disabled: true
				},
				{
					key: "4-2",
					label: "Identify Solutions",
					completed: true,
					disabled: true
				},
				{
					key: "4-3",
					label: "Prioritize implementation strategy",
					completed: true,
					disabled: true
				},
			]
		},
		{
			key: "5",
			label: "Plan Prep, Review, & Approval",
			nodes: [
				{
					key: "5-1",
					label: "Document Plans & Strategy",
					completed: true,
					disabled: true
				},
				{
					key: "5-2",
					label: "Obtain Feedback & Approval",
					completed: true,
					disabled: true
				},
				{
					key: "5-3",
					label: "Finalize & Approve The Plan",
					completed: true,
					disabled: true
				},
			]
		},
		{
			key: "6",
			label: "Plan Implementation & Maintenance",
			nodes: [
				{
					key: "6-1",
					label: "Execute approved solutions",
					completed: true,
					disabled: true
				},
				{
					key: "6-2",
					label: "Evaluate & Update",
					completed: true,
					disabled: true
				},
				{
					key: "6-3",
					label: "Modify Strategy (as needed)",
					completed: true,
					disabled: true
				},
			]
		}
	];

	let menus = [];

	treeData.map(({key, label, nodes}) => {
		let subMenus = [];
		nodes.map(({key, label, completed, disabled, route}) => {
			subMenus.push(
				<ListItem button style={{paddingLeft: 40, textTransform: "capitalize"}} key={key} selected={openSubMenu === key}
				  onClick={handleSubmenuClick(route)} disabled={disabled}>
					<ListItemText primary={`${key}. ${label}`}  />
					{completed ? <CheckCircleIcon style={{color: "green"}}/> : "" }
				</ListItem>
			);
		});
		menus.push(
			<div key={key}>
				<ListItem button disableGutters={true} className={classes.parentMenu}
					onClick={handleParentClick(key)} onLoad={handleParentLoad(key)}>
					{openTask === key ? <DownIcon fontSize="large" /> : <RightIcon fontSize="large"/>}
					<ListItemText  primary={`${key}. ${label}`} />
				</ListItem>
				<Collapse in={openTask === key} timeout="auto" unmountOnExit>
					{subMenus}
				</Collapse>
				<Divider/>
			</div>
		);
	});

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

						<Grid container justify="center">
							<Grid item>
								<img src={Logo} className={classes.headerLogo} alt="Community Resilience"
										 style={{maxHeight: 50, maxWidth: 50}}/>
							</Grid>

							<Grid item style={{display: "flex", marginTop: "6px"}}>
								<div >
									<div className="titleSmall">
										Playbook Interactive Guide for
									</div>
									<div className="titleLarge">
										Community Resilience Planning
									</div>
								</div>
							</Grid>
						</Grid>
					</a>

					<div className={classes.grow} />
					<div className={isAuthenticated ? classes.sectionDesktop: classes.hide}>
						<IconButton aria-label="show messages" color="inherit">
							<Badge variant="dot" color="primary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show notifications" color="inherit">
							<Badge variant="dot" color="primary">
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
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					// className={classes.root}
				 >
					{menus}
				</List>
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
