import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import TaskService from '../services/task'
import React from 'react'

const FormTask = (props) => {
  const [dialog, setDialog] = React.useState(true)
  const [user, setUser] = React.useState(props.user)
  const [description, setDescription] = React.useState(props.task ? props.task.description : '')
  const [state, setState] = React.useState(props.task ? props.task.state : false)

  const handleSave = (event) => {
    event.preventDefault()
    setDialog(false)

    const task = {
      user: user,
      description: description,
      state: state
    }

    TaskService.createTask(task)
    props.passFormUser(false)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    setDialog(false)

    props.task.description = description
    props.task.state = state

    TaskService.updateTask(props.task)
    props.passFormUser(false)
    props.updateSelected(null)
  }

  return (
    <Dialog
      open={dialog}
      onClose={(event) => setDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`Add new task`}</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          id="userName"
          label="Attribution"
          value={user.name}
          type="text"
          fullWidth
        />
        <TextField
          required
          id="description"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              id="state"
              defaultChecked={state}
              onChange={(event) => setState(event.target.checked)}
            />
          }
          label="Done"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => {
          setDialog(false)
          props.passFormUser(false)
          props.updateSelected(null)
        }} color="primary">Cancel</Button>
        {!props.task && <Button onClick={handleSave} color="secondary" autoFocus>Save</Button>}
        {props.task && <Button onClick={handleUpdate} color="secondary" autoFocus>Update</Button>}
      </DialogActions>
    </Dialog>
  )
}

export default FormTask
