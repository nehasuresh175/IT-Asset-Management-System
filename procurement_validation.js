(function executeRule(current, previous /* null when async */) {

    // Requested item
    if (current.requested_item.nil()) {
        gs.addErrorMessage('Requested item is required.');
        current.setAbortAction(true);
        return;
    }

    // Quantity
    if (current.quantity.nil() ||
        parseInt(current.quantity, 10) <= 0) {

        gs.addErrorMessage(
            'Procurement quantity must be greater than zero.'
        );

        current.setAbortAction(true);
        return;
    }

    // Requested by
    if (current.requested_by.nil()) {
        gs.addErrorMessage('Requester is required.');
        current.setAbortAction(true);
        return;
    }

    // Vendor
    if (current.vendor.nil()) {
        gs.addErrorMessage('Preferred vendor is required.');
        current.setAbortAction(true);
        return;
    }

    // Estimated cost
    if (current.estimated_cost.nil() ||
        parseFloat(current.estimated_cost) <= 0) {

        gs.addErrorMessage(
            'Estimated procurement cost must be greater than zero.'
        );

        current.setAbortAction(true);
        return;
    }

    // Required date
    if (current.required_date.nil()) {
        gs.addErrorMessage('Required date is mandatory.');
        current.setAbortAction(true);
        return;
    }

    // Prevent procurement request for inactive requester
    var requester = new GlideRecord('sys_user');

    if (requester.get(current.requested_by) &&
        !requester.active) {

        gs.addErrorMessage(
            'The requester is inactive.'
        );

        current.setAbortAction(true);
        return;
    }

})(current, previous);
