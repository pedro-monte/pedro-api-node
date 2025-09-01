function calculateAgeOfUser(user) {
    return new Date().getFullYear() - user.birthYear;
}
calculateAgeOfUser({ birthYear: 1980 });
//calculateAgeOfUser(); // typescript helps to avoid these errors
//Runtime type checking = JS
//Static type checking = TS
