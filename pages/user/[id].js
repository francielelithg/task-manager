import React from 'react'
import UserService from '../../services/user'
import TaskService from '../../services/task'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FormUser from '../../components/FormUser'
import FormTask from '../../components/FormTask'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const User = (props) => {
  const classes = useStyles()
  const router = useRouter()

  const [user] = React.useState(props.user)
  const [allowEdit, setAllowEdit] = React.useState(false)
  const [deleteUserDialog, setDeleteUserDialog] = React.useState(false)
  const [deleteTaskDialog, setDeleteTaskDialog] = React.useState(false)
  const [task, setTask] = React.useState(null)
  const [formTask, setFormTask] = React.useState(false)
  const [reaload, setReload] = React.useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleEditTask = (event, task) => {
    setTask(task)
    setFormTask(true)
  }

  const handleDelete = (event, user) => {
    setDeleteUserDialog(false)
    setReload(true)

    UserService.deleteUser(user.id)
      .then(() => {
        router.back()
        setReload(false)
      })
      .catch(() => {
        setReload(false)
      })
  }

  const handleDeleteTask = (event) => {
    setDeleteTaskDialog(false)
    setReload(true)

    TaskService.deleteTask(task.id)
      .then(() => {
        router.reload()
        setReload(false)
      })
      .catch(() => {
        setReload(false)
      })

    setTask(null)
  }

  const reload = () => {
    router.reload()
  }

  return (
    <MainLayout>

      <div className={classes.grow}>
        <AppBar position="static">
          <Container maxWidth='sm'>
            <Toolbar disableGutters>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={handleBack}
                color="inherit"
                aria-label="open drawer"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {user.name}
              </Typography>
              <div className={classes.grow} />
              <IconButton
                edge="end"
                aria-label="create new"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => setAllowEdit(true)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="create new"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => setDeleteUserDialog(true)}>
                <DeleteIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <Container maxWidth='sm'>
        <Box my={4}>
          <Box display="flex" mb={2}>
            <Box flexGrow={1} alignItems="center">
              <Typography variant="h6" display="block" gutterBottom>
                Atributted tasks ({user.userTasks.length})
              </Typography>
            </Box>
            <Box>
              <Button disableElevation variant="contained" color="secondary" onClick={(event) => setFormTask(true)} size="small">
                add new
              </Button>
            </Box>
          </Box>

          {user.userTasks.map((task, index) => (
            <ListItem key={index} className={index % 2 == 0 ? classes.listEven : null}>
              <ListItemAvatar>
                <Checkbox
                  id="state"
                  checked={task.state}
                  disabled
                  inputProps={{ 'aria-label': 'done' }}
                />
              </ListItemAvatar>
              <ListItemText primary={task.description} />
              <IconButton size='small' edge="end" aria-label="edit-task" onClick={(event) => handleEditTask(event, task)}>
                <EditIcon />
              </IconButton>
              <IconButton size='small' edge="end" aria-label="delete-task" onClick={(event) => {
                setDeleteTaskDialog(true)
                setTask(task)
              }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </Box>
      </Container>

      {allowEdit && <FormUser user={user} passFormUser={setAllowEdit} />}

      {formTask && <FormTask user={user} task={task} passFormUser={setFormTask} updateSelected={setTask} reload={reload} />}

      <Dialog
        open={deleteUserDialog}
        onClose={(event) => setDeleteUserDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete user ${user.name}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={(event) => setDeleteUserDialog(false)} color="primary">Cancel</Button>
          <Button onClick={(event) => handleDelete(event, user)} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteTaskDialog}
        onClose={(event) => setDeleteTaskDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete task?`}</DialogTitle>
        <DialogActions>
          <Button onClick={(event) => {
            setDeleteTaskDialog(false)
            setTask(null)
          }} color="primary">Cancel</Button>
          <Button onClick={(event) => handleDeleteTask(event, user)} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={reaload}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainLayout>
  )
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
  listEven: {
    backgroundColor: '#f8f8f8'
  },
}))

export async function getServerSideProps(context) {
  const user = await UserService.getUserById(context.query.id)
  return {
    props: {
      user: user
    }
  }
}

export default User
