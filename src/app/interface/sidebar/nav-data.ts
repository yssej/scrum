export const navbarData = [
    // {
    //     routeLink: 'Backlog',
    //     icon: 'bi bi-speedometer',
    //     label: 'Tableau de bord',
    //     isAdministrateur() {let ans:boolean = true;return ans;},
    //     isProductOwner() {let ans:boolean = true;return ans;},
    //     isScrumMaster() {let ans:boolean = true;return ans;},
    //     isDevelloper() {let ans:boolean = true;return ans;}
    // },
    {
        routeLink: 'Projet',
        icon: 'bi bi-speedometer',
        label: 'Tableau de bord',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = true;return ans;},
        isScrumMaster() {let ans = true;return ans;},
        isDevelloper() {let ans = true;return ans;}
    },
    {
        routeLink: 'ProjetGestion',
        icon: 'bi bi-briefcase',
        label: 'Gestion projet',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = false;return ans;},
        isScrumMaster() {let ans = false;return ans;},
        isDevelloper() {let ans = false;return ans;}
    },
    {
        routeLink: 'Backlog2',
        icon: 'bi bi-journal-text',
        label: 'Backlog',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = true;return ans;},
        isScrumMaster() {let ans = true;return ans;},
        isDevelloper() {let ans = true;return ans;}
    },
    {
        routeLink: 'RecapSprint',
        icon: 'bi bi-blockquote-left',
        label: 'Sprint recap',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = true;return ans;},
        isScrumMaster() {let ans = true;return ans;},
        isDevelloper() {let ans = true;return ans;}
    },
    {
        routeLink: 'Gantt',
        icon: 'bi bi-bar-chart-steps',
        label: 'Gantt chart',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = true;return ans;},
        isScrumMaster() {let ans = true;return ans;},
        isDevelloper() {let ans = true;return ans;}
    },
    // {
    //     routeLink: 'Tableau',
    //     icon: 'bi bi-table',
    //     label: 'Tableau',
    //     isAdministrateur() {let ans = true;return ans;},
    //     isProductOwner() {let ans = true;return ans;},
    //     isScrumMaster() {let ans = true;return ans;},
    //     isDevelloper() {let ans = true;return ans;}
    // },
    {
        routeLink: 'ListUtilisateurs',
        icon: 'bi bi-people',
        label: 'Gestion utilisateur',
        isAdministrateur() {let ans = true;return ans;},
        isProductOwner() {let ans = false;return ans;},
        isScrumMaster() {let ans = false;return ans;},
        isDevelloper() {let ans = false;return ans;}
    }
    // ,
    // {
    //     routeLink: 'Parametres',
    //     icon: 'bi bi-gear-fill',
    //     label: 'Paramètres',
    //     isAdministrateur() {let ans = true;return ans;},
    //     isProductOwner() {let ans = false;return ans;},
    //     isScrumMaster() {let ans = false;return ans;},
    //     isDevelloper() {let ans = false;return ans;}
    // }
]