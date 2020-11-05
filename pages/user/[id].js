import React from 'react'
import UserService from '../../services/user'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FormUser from '../../components/FormUser'

const User = (props) => {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = React.useState(props.user)
  const [allowEdit, setAllowEdit] = React.useState(false)
  const [deleteDialog, setDeleteDialog] = React.useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleDelete = (event, user) => {
    setDeleteDialog(false)
    UserService.deleteUser(user.id)
    .then(() => {
      router.back()
    })
  }

  return (
    <MainLayout>
      <Typography variant="h6" gutterBottom>
        <IconButton edge="end" aria-label="more" aria-controls="fade-menu" aria-haspopup="true" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        {user.name}
        <IconButton edge="end" aria-label="more" aria-controls="fade-menu" aria-haspopup="true" onClick={(event) => setAllowEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="more" aria-controls="fade-menu" aria-haspopup="true" onClick={(event) => setDeleteDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </Typography>

      <Typography variant="subtitle1" display="block" gutterBottom>Atributted tasks</Typography>

      {allowEdit && <FormUser user={user} passFormUser={setAllowEdit} />}

      <Dialog
        open={deleteDialog}
        onClose={(event) => setDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete user ${user.name}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={(event) => setDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={(event) => handleDelete(event, user)} color="secondary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
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
