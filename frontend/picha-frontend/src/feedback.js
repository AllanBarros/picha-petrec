import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function FormDialog(props) {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleEmail(e) {
        return setEmail(e.target.value)
    }

    function handleMessage(e) {
        return setMessage(e.target.value)
    }

    const options = {
        headers: { 'Content-Type': 'application/json' }
    }

    function handleSubmit(handle) {

        var valor = { 'email': email, 'message': message }

        axios.post('http://localhost:8000/feedback/', {
            valor
        })
            .then((response) => {
                console.log(response)
                return handle()
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Dialog open={props.state} onClose={props.handle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">We love feedback</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={(e) => handleEmail(e)}
                    />
                    <TextField
                        style={{'minWidth':'100%'}}
                        id="message"
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={(e) => handleMessage(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handle} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => {handleSubmit(props.handle)}} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}