import React from 'react'
import UserService from '../services/user'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/MainLayout'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'
import FormUser from '../components/FormUser'
import { fade, makeStyles } from '@material-ui/core/styles'

const Users = props => {
  const classes = useStyles()
  const router = useRouter()

  const users = props.users

  const [formUser, setFormUser] = React.useState(false)
  const [usersList, setUsersList] = React.useState(users)
  const [forceUpdate, setForceUpdate] = React.useState(false)
  const [linearProgress, setLinearProgress] = React.useState(false)

  React.useEffect(() => {
    if (forceUpdate) {
      setLinearProgress(true)
      UserService.getAllUsers()
        .then(result => {
          if (result.length > 0) {
            setUsersList(result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
            setLinearProgress(false)
            setForceUpdate(false)
          }
        })
        .catch(() => {
          setLinearProgress(false)
        })
    }
  })

  const test = (event, user) => {
    setLinearProgress(true)
    router.push({
      pathname: '/user/[id]',
      query: { id: user.id }
    })
  }

  const handleFormUser = () => {
    setFormUser(true)
  }

  const handleSearch = event => {
    const typed = event.target.value

    if (typed !== '') {
      setUsersList(users.filter(user => user.name.toUpperCase().includes(typed.toUpperCase())))
    } else {
      setUsersList(users)
    }
  }

  return (
    <MainLayout>

      <div className={classes.grow}>
        <AppBar position="static">
          <Container maxWidth='sm'>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Users
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={handleSearch}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
                <IconButton
                  edge="end"
                  aria-label="create new"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleFormUser}>
                  <AddCircleIcon />
                </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        {linearProgress ? <LinearProgress color="secondary" /> : <Box mt={2} />}
      </div>

      {formUser && <FormUser passFormUser={setFormUser} update={setForceUpdate} />}

      <Container maxWidth='sm'>
        <Box my={4}>
          <List>
            {usersList.map((user, index) => (
              <ListItem button onClick={(event) => test(event, user)} key={index} className={index % 2 == 0 ? classes.listEven : null}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </MainLayout >
  )
}

export async function getServerSideProps(context) {
  const users = await UserService.getAllUsers()
  
  return {
    props: {
      users: users.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    }
  }
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  listEven: {
    backgroundColor: '#f8f8f8'
  },
}))

export default Users
