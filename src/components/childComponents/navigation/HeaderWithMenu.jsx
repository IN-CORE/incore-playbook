import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

import { setMenuState } from "../../../actions/layout";
import { getAllSteps } from "../../../actions/steps";

import { menuWidth } from "../../../globals";
import Cookies from "universal-cookie";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Grid from "@material-ui/core/Grid";

const cookies = new Cookies();

const drawerWidth = menuWidth;

const useStyles = makeStyles((theme) => ({
	root: {
		fontFamily: "Rubik, san-serif"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(0.5)
	},
	menuIcon: {
		height: 36,
		width: 36
	},
	headerLogo: {
		height: "44px",
		marginRight: theme.spacing(1)
	},
	hide: {
		display: "none"
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
			alignItems: "center"
		}
	},
	titleLink: {
		textDecoration: "none",
		color: "inherit"
	},
	inputRoot: {
		color: "inherit"
	},
	sectionDesktop: {
		display: "flex"
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

const HeaderWithMenu = ({
	dispatch,
	isAuthenticated,
	menuItem,
	headerTitle = "Playbook Interactive Guide for",
	headerSubTitle = "Community Resilience Planning"
}) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();

	const assetConfig = useSelector((state) => state.config.assetConfig);
	const stepStatus = useSelector((state) => state.steps);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		getAllSteps()(dispatch);
	}, []);

	// //TODO: move this to utils if needed
	const handleLogout = () => {
		cookies.remove("Authorization", { path: "/" });
		history.push("/login");
	};

	let openSubMenu = "1-1";
	let openMenu = 1;

	if (menuItem) {
		openSubMenu = menuItem;
		openMenu = openSubMenu.split("-")[0];
	}

	if (openMenu === null || openMenu === undefined) {
		openMenu = "1";
	}

	let [open, setOpen] = isAuthenticated ? React.useState(true) : React.useState(false);

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
		openTask === key ? setOpenTask("0") : setOpenTask(key);
		if (key === "1") {
			history.push("/create-team");
		} else if (key === "2") {
			history.push("/community");
		} else if (key === "3") {
			history.push("/goal-objective");
		} else if (key === "4") {
			history.push("/plan-development");
		} else if (key === "5") {
			history.push("/review");
		} else if (key === "6") {
			history.push("/implementation");
		} else {
			history.push("/");
		}
	};

	const handleParentLoad = (key) => () => {
		openTask === key ? setOpenTask("0") : setOpenTask(key);
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

	let treeData = [
		{
			key: "1",
			label: "Form Collaborative Planning Team",
			nodes: [
				{
					key: "1-1",
					label: "Identify leader",
					status: "pending",
					disabled: false,
					route: "/create-team-leader"
				},
				{
					key: "1-2",
					label: "Identify Team Members",
					status: "in_progress",
					disabled: false,
					route: "/create-team-member"
				},
				{
					key: "1-3",
					label: "Establish the scope",
					status: "completed",
					disabled: false,
					route: "/create-team-scope"
				},
				{
					key: "1-4",
					label: " Identify key stakeholders",
					status: "pending",
					disabled: false,
					route: "/create-team-stakeholder"
				}
			]
		},
		{
			key: "2",
			label: "Understanding the Situation",
			nodes: [
				{
					key: "2-1",
					label: "Assess existing community plans",
					status: "pending",
					disabled: false,
					route: "/community-plan"
				},
				{
					key: "2-2",
					label: "Characterize community members",
					status: "pending",
					disabled: false,
					route: "/community-member"
				},
				{
					key: "2-3",
					label: "Characterize social functions",
					status: "pending",
					disabled: false,
					route: "/community-function"
				},
				{
					key: "2-4",
					label: "Characterize built environment",
					status: "pending",
					disabled: false,
					route: "/community-environment"
				},
				{
					key: "2-5",
					label: "Link social functions & built environment",
					status: "pending",
					disabled: false,
					route: "/community-link"
				}
			]
		},
		{
			key: "3",
			label: "Determine Goals & Objectives",
			nodes: [
				{
					key: "3-1",
					label: "Identify long-term community goals",
					status: "pending",
					disabled: false,
					route: "/goal-objective-long"
				},
				{
					key: "3-2",
					label: "Establish performance goals",
					status: "pending",
					disabled: false,
					route: "/goal-objective-desired"
				},
				{
					key: "3-3",
					label: "Define community hazards",
					status: "pending",
					disabled: false,
					route: "/goal-objective-hazard"
				},
				{
					key: "3-4",
					label: "Determine anticipated performance",
					status: "pending",
					disabled: false,
					route: "/goal-objective-performance"
				},
				{
					key: "3-5",
					label: "Summarize the results",
					status: "pending",
					disabled: false,
					route: "/goal-objective-result"
				}
			]
		},
		{
			key: "4",
			label: "Plan Development",
			nodes: [
				{
					key: "4-1",
					label: "Evaluate Gaps",
					status: "pending",
					disabled: false,
					route: "/plan-development-gap"
				},
				{
					key: "4-2",
					label: "Identify Solutions",
					status: "pending",
					disabled: false,
					route: "/plan-development-solution"
				},
				{
					key: "4-3",
					label: "Prioritize implementation strategy",
					status: "pending",
					disabled: false,
					route: "/plan-development-strategy"
				}
			]
		},
		{
			key: "5",
			label: "Plan Prep, Review, & Approval",
			nodes: [
				{
					key: "5-1",
					label: "Document Plans & Strategy",
					status: "pending",
					disabled: false,
					route: "/review-strategy"
				},
				{
					key: "5-2",
					label: "Obtain Feedback & Approval",
					status: "pending",
					disabled: false,
					route: "/review-approval"
				},
				{
					key: "5-3",
					label: "Finalize & Approve The Plan",
					status: "pending",
					disabled: false,
					route: "/review-final"
				}
			]
		},
		{
			key: "6",
			label: "Plan Implementation & Maintenance",
			nodes: [
				{
					key: "6-1",
					label: "Execute approved solutions",
					status: "pending",
					disabled: false,
					route: "/implementation-execute"
				},
				{
					key: "6-2",
					label: "Evaluate & Update",
					status: "pending",
					disabled: false,
					route: "/implementation-update"
				},
				{
					key: "6-3",
					label: "Modify Strategy (as needed)",
					status: "pending",
					disabled: false,
					route: "/implementation-modify"
				}
			]
		}
	];

	let menus = [];
	const greenCheckIcon = <CheckCircleIcon style={{ color: "green" }} />;
	const orangeCheckIcon = <CheckCircleIcon style={{ color: "orange" }} />;

	treeData.map(({ key, label, nodes }) => {
		let subMenus = [];
		let subMenusStatus = [];
		nodes.map(({ key, label, status, disabled, route }) => {
			subMenus.push(
				<ListItem
					button
					style={{ paddingLeft: 40, textTransform: "capitalize" }}
					key={key}
					selected={openSubMenu === key}
					onClick={handleSubmenuClick(route)}
					disabled={disabled}
				>
					<ListItemText primary={`${key}. ${label}`} />
					{Object.keys(stepStatus).length === 0 ? (
						<QueryBuilderIcon />
					) : (
						<>
							{stepStatus[`step_${key.replace("-", "_")}`].status === "pending" ? (
								<QueryBuilderIcon />
							) : stepStatus[`step_${key.replace("-", "_")}`].status === "in_progress" ? (
								orangeCheckIcon
							) : (
								greenCheckIcon
							)}
						</>
					)}
				</ListItem>
			);
			if (Object.keys(stepStatus).length === 0) {
				subMenusStatus.push("pending");
			} else {
				subMenusStatus.push(stepStatus[`step_${key.replace("-", "_")}`].status);
			}
		});
		menus.push(
			<div key={key}>
				<ListItem
					button
					disableGutters={true}
					className={classes.parentMenu}
					onClick={handleParentClick(key)}
					onLoad={handleParentLoad(key)}
				>
					{openTask === key ? <DownIcon fontSize="large" /> : <RightIcon fontSize="large" />}
					<ListItemText primary={`${key}. ${label}`} />
					{subMenusStatus.includes("in_progress") ? (
						orangeCheckIcon
					) : (
						<>{subMenusStatus.includes("pending") ? <QueryBuilderIcon /> : greenCheckIcon}</>
					)}
				</ListItem>
				<Collapse in={openTask === key} timeout="auto" unmountOnExit>
					{subMenus}
				</Collapse>
				<Divider />
			</div>
		);
	});

	return (
		<div className={classes.grow}>
			<CssBaseline />
			<AppBar
				position="relative"
				color="transparent"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
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

					<Link to="/" className={classes.titleLink}>
						<Grid container justify="center">
							<Grid item>
								<img
									src={assetConfig.communityResilienceLogo}
									className={classes.headerLogo}
									alt="Community Resilience"
									style={{ maxHeight: 50, maxWidth: 50 }}
								/>
							</Grid>

							<Grid item style={{ display: "flex", marginTop: "6px" }}>
								<div>
									<div className="titleSmall">{headerTitle}</div>
									<div className="titleLarge">{headerSubTitle}</div>
								</div>
							</Grid>
						</Grid>
					</Link>

					<div className={classes.grow} />
					<div className={isAuthenticated ? classes.sectionDesktop : classes.hide}>
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
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>{" "}
					<br />
					<Divider />
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
					[classes.contentShift]: open
				})}
			/>
		</div>
	);
};

export default connect()(HeaderWithMenu);
