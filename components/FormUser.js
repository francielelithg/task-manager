import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import UserService from '../services/user'
import React from 'react'

const FormUser = props => {
  const [dialogAdd, setDialogAdd] = React.useState(true)
  const [name, setName] = React.useState('')

  const handleChange = event  => {
    event.persist()
    setName(event.target.value)
  }

  const handleSave = (event) => {
    event.preventDefault()
    setDialogAdd(false)

    const user = {
      name: name
    }

    UserService.createUser(user)
      .then(() => {
        props.update()
      })

    props.passFormUser(false)
  }

  return (
    <Dialog
      open={dialogAdd}
      onClose={(event) => setDialogAdd(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`Add new user`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Name"
          value={name}
          onChange={handleChange}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => setDialogAdd(false)} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="secondary" autoFocus>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormUser