export const EventTabs = [
    { id: 1, name: 'General', desc:'General tab for managing event properties' },
    { id: 2, name: 'Registration', desc:'Manage registrations(products)'   },
    { id: 3, name: 'Optional Costs', desc:'Add additional items such as t-shirts'   },
    { id: 4, name: 'Status', desc:'Manage status of event'   },
    
];

export const RolePermissions = [
    { id: 1, name: 'Administrator', Access:'users,events,finances,reporting,roles,settings,certifications,checkin'},
    { id: 2, name: 'Event Administrator', Access:'users,events,checkin'},
    { id: 3, name: 'Checkin Staff', Access:'events,checkin'},  
];

export const AdminRoles = {
    CMSCommunityAdministrator: "CMS Community Administrator",
    CMSDeskAdministrator: "CMS Desk Administrator",
    BOMAdministrator: "BOM Administrator",
    BOMCheckInStaff: "BOM Check-In Staff",
    BOMDRCoordinator: "BOM DR Coordinator",
    BOMDRTrainingAdministrator: "BOM DR Training Administrator",
    BOMEvenAdministrator: "BOM Event Administrator",
    BOMEventCoordinator: "BOM Event Coordinator",
    BOMSuperAdministrator: "BOM Super Administrator",
}