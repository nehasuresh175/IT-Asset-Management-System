(function executeRule(current, previous /* null when async */) {

    // Execute only when lifecycle state changes
    if (!current.install_status.changes()) {
        return;
    }

    var oldState = previous.install_status.toString();
    var newState = current.install_status.toString();

    // Allowed lifecycle transitions
    var allowedTransitions = {
        '1': ['2'],       // Procured -> Received
        '2': ['3'],       // Received -> In Stock
        '3': ['6'],       // In Stock -> Deployed
        '6': ['7'],       // Deployed -> In Maintenance
        '7': ['6', '8'],  // Maintenance -> Deployed / Retired
        '8': ['9'],       // Retired -> Disposed
        '9': []           // Disposed -> No further transition
    };

    if (!allowedTransitions[oldState] ||
        allowedTransitions[oldState].indexOf(newState) === -1) {

        gs.addErrorMessage(
            'Invalid asset lifecycle transition.'
        );

        current.setAbortAction(true);
        return;
    }

    // Prevent deployment without an assigned user
    if (newState === '6' && current.assigned_to.nil()) {

        gs.addErrorMessage(
            'An asset must be assigned to a user before deployment.'
        );

        current.setAbortAction(true);
        return;
    }

})(current, previous);
