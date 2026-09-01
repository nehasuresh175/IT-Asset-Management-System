(function executeRule(current, previous /* null when async */) {

    // No CI associated with the asset
    if (current.ci.nil()) {
        return;
    }

    var ci = new GlideRecord('cmdb_ci');

    if (!ci.get(current.ci)) {
        gs.warn(
            'Associated CI not found for asset ' +
            current.asset_tag
        );
        return;
    }

    var changed = false;

    // Synchronize asset name with CI name
    if (!current.display_name.nil() &&
        ci.name != current.display_name) {

        ci.name = current.display_name;
        changed = true;
    }

    // Synchronize serial number
    if (!current.serial_number.nil() &&
        ci.serial_number != current.serial_number) {

        ci.serial_number = current.serial_number;
        changed = true;
    }

    // Synchronize assigned user
    if (!current.assigned_to.nil() &&
        ci.assigned_to != current.assigned_to) {

        ci.assigned_to = current.assigned_to;
        changed = true;
    }

    // Synchronize location
    if (!current.location.nil() &&
        ci.location != current.location) {

        ci.location = current.location;
        changed = true;
    }

    // Synchronize operational status
    if (!current.install_status.nil()) {

        var operationalStatus =
            getOperationalStatus(current.install_status);

        if (operationalStatus &&
            ci.operational_status != operationalStatus) {

            ci.operational_status = operationalStatus;
            changed = true;
        }
    }

    if (changed) {
        ci.update();
    }

    function getOperationalStatus(assetState) {

        switch (assetState.toString()) {

            case '3':
                return '1'; // Operational

            case '6':
                return '1'; // Operational

            case '7':
                return '2'; // Under Maintenance

            case '8':
                return '6'; // Retired

            case '9':
                return '6'; // Retired

            default:
                return '';
        }
    }

})(current, previous);
