(function executeRule(current, previous /* null when async */) {

    // Run only when assignment changes
    if (!current.assigned_to.changes() &&
        !current.install_status.changes()) {
        return;
    }

    // No assigned user means the asset cannot be deployed
    if (current.install_status == 6 &&
        current.assigned_to.nil()) {

        gs.addErrorMessage(
            'An asset cannot be deployed without an assigned user.'
        );

        current.setAbortAction(true);
        return;
    }

    // Populate deployment information
    if (current.install_status == 6) {

        if (current.u_deployment_date.nil()) {
            current.u_deployment_date = new GlideDateTime();
        }

        // Set active status
        if (current.u_asset_status.nil() ||
            current.u_asset_status != 'active') {

            current.u_asset_status = 'active';
        }
    }

})(current, previous);
