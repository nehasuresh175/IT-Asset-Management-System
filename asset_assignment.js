(function executeRule(current, previous /* null when async */) {

    // Run only when Assigned To is populated or changed
    if (current.assigned_to.nil()) {
        return;
    }

    var user = new GlideRecord('sys_user');

    if (!user.get(current.assigned_to)) {
        gs.addErrorMessage('The selected user does not exist.');
        current.setAbortAction(true);
        return;
    }

    // User must be active
    if (!user.active) {
        gs.addErrorMessage(
            'The selected user is inactive and cannot receive an asset.'
        );
        current.setAbortAction(true);
        return;
    }

    // Prevent assigning a retired asset
    if (current.install_status == 7 ||
        current.install_status == 8) {

        gs.addErrorMessage(
            'Retired or disposed assets cannot be assigned.'
        );
        current.setAbortAction(true);
        return;
    }

    // Automatically associate department
    if (current.department.nil() && !user.department.nil()) {
        current.department = user.department;
    }

    // Automatically associate location
    if (current.location.nil() && !user.location.nil()) {
        current.location = user.location;
    }

})(current, previous);
