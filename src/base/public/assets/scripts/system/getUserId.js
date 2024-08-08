function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        userId: params.get('userId'),
        active: params.get('active'),
    };
}