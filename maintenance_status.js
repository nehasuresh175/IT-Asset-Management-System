(function executeRule(current, previous /* null when async */) {

    // Execute only when maintenance/status fields change
    if (!current.install_status.changes()) {
        return;
    }

    // Deployed -> Maintenance
    if (current.install_status == 7) {

        if (current.assigned_to.nil()) {
            gs.addErrorMessage(
                'The asset must have an assignment history before maintenance.'
            );
        }

        current.u_maintenance_start =
            new GlideDateTime();

        current.u_maintenance_status = 'in_progress';

        return;
    }

    // Maintenance -> Deployed
    if (current.install_status == 6 &&
        previous.install_status == 7) {

        current.u_maintenance_end =
            new GlideDateTime();

        current.u_maintenance_status = 'completed';

        return;
    }

    // Maintenance -> Retired
    if (current.install_status == 8 &&
        previous.install_status == 7) {

        current.u_maintenance_end =
            new GlideDateTime();

        current.u_maintenance_status = 'closed';
    }

})(current, previous);
