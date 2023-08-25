import React from 'react'
import DialogForm from '../components/dialogForm'

function Dialogs({ selectedDialog, dialogs, selectedDialogstoRun }) {
    return (
        <div>
            <DialogForm selectedDialog={selectedDialog} dialogs={dialogs} selectedDialogstoRun={selectedDialogstoRun} />

        </div>
    )
}

export default Dialogs
