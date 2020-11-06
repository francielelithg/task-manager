import React from 'react'
import UserService from '../../services/user'
import TaskService from '../../services/task'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
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

const User = (props) => {
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
      <Typography variant="h6" gutterBottom>
        <IconButton edge="end" aria-controls="fade-menu" aria-haspopup="true" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        {user.name}
        <IconButton edge="end" aria-controls="fade-menu" aria-haspopup="true" onClick={(event) => setAllowEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-controls="fade-menu" aria-haspopup="true" onClick={(event) => setDeleteUserDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </Typography>

      <Typography variant="subtitle1" display="block" gutterBottom>
        Atributted tasks
        <IconButton edge="end" aria-controls="fade-menu" aria-haspopup="true" onClick={(event) => setFormTask(true)}>
          <AddCircleIcon />
        </IconButton>
      </Typography>

      {user.userTasks.map((task, index) => (
        <ListItem button key={index}>
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
          <Button onClick={(event) => { setDeleteTaskDialog(false)
                                        setTask(null) }} color="primary">Cancel</Button>
          <Button onClick={(event) => handleDeleteTask(event, user)} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={reaload}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const user = await UserService.getUserById(context.query.id)
  return {
    props: {
      user: user
    }
  }
}

export default User
