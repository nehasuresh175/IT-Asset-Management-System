(function executeRule(current, previous /* null when async */) {

    // Asset Tag validation
    if (current.asset_tag.nil()) {
        gs.addErrorMessage('Asset Tag is required.');
        current.setAbortAction(true);
        return;
    }

    // Asset Name validation
    if (current.display_name.nil() ||
        current.display_name.toString().trim() === '') {

        gs.addErrorMessage('Asset Name is required.');
        current.setAbortAction(true);
        return;
    }

    // Serial Number validation
    if (current.serial_number.nil() ||
        current.serial_number.toString().trim() === '') {

        gs.addErrorMessage('Serial Number is required.');
        current.setAbortAction(true);
        return;
    }

    // Model validation
    if (current.model.nil()) {
        gs.addErrorMessage('Asset Model is required.');
        current.setAbortAction(true);
        return;
    }

    // Location validation
    if (current.location.nil()) {
        gs.addErrorMessage('Asset Location is required.');
        current.setAbortAction(true);
        return;
    }

    // Prevent duplicate Serial Numbers
    var duplicate = new GlideRecord('alm_asset');
    duplicate.addQuery('serial_number', current.serial_number);
    duplicate.addQuery('sys_id', '!=', current.sys_id);
    duplicate.query();

    if (duplicate.next()) {
        gs.addErrorMessage(
            'An asset with this Serial Number already exists: ' +
            duplicate.asset_tag
        );
        current.setAbortAction(true);
        return;
    }

})(current, previous);
