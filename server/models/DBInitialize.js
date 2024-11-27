const Role = require('./Role.js');
const ClubCardCategory = require('./ClubCardCategory.js');
const User = require('./User.js');
const Client = require('./Client.js');
const Instructor = require('./Instructor.js');
const Group = require('./Group.js');
const Workout = require('./Workout.js');
const WorkoutCategory = require('./WorkoutCategory.js');
const ClubCard = require('./ClubCard.js');
const Hall = require('./Hall.js');
const InstructorWorkout = require('./InstructorWorkout.js');
const ClientGroup = require('./ClientGroup.js');
const Coupon = require('./Coupon.js');
const Review = require('./Review.js');


seedRoles = async () => {
    try {
        let adminRole = await Role.findOne({ name: 'admin' });

        if (!adminRole) {
            adminRole = new Role({ name: 'admin' });
            await adminRole.save();
            console.log('Role "admin" created');
        }

        let clientRole = await Role.findOne({ name: 'client' });

        if (!clientRole) {
            clientRole = new Role({ name: 'client' });
            await clientRole.save();
            console.log('Role "client" created');
        }

        let instructorRole = await Role.findOne({ name: 'instructor' });

        if (!instructorRole) {
            instructorRole = new Role({ name: 'instructor' });
            await instructorRole.save();
            console.log('Role "instructor" created');
        }

        console.log('Roles created successfully');

    } catch (err) {
        console.error('Error while initialize roles:', err.message);
    }
}
seedClubCardCategories = async () => {
    try {
        let simpleCardCategory = await ClubCardCategory.findOne({ name: 'simple' });

        if (!simpleCardCategory) {
            simpleCardCategory = new ClubCardCategory({ name: 'simple', discount: 0.01 });
            await simpleCardCategory.save();
            console.log('CardCategory "simple" created');
        }

        let middleCardCategory = await ClubCardCategory.findOne({ name: 'middle' });

        if (!middleCardCategory) {
            middleCardCategory = new ClubCardCategory({ name: 'middle', discount: 0.03 });
            await middleCardCategory.save();
            console.log('CardCategory "middle" created');
        }

        let vipCardCategory = await ClubCardCategory.findOne({ name: 'VIP' });

        if (!vipCardCategory) {
            vipCardCategory = new ClubCardCategory({ name: 'VIP', discount: 0.1 });
            await vipCardCategory.save();
            console.log('CardCategory "VIP" created');
        }

        console.log('CardCategories created successfully');

    } catch (err) {
        console.error('Error while initialize card_categories:', err.message);
    }
}
seedWorkoutCategories = async () => {
    try {
        const indecies = [1, 2, 3, 4, 5];
        for (const ind of indecies) {
            const category_exist = await WorkoutCategory.findOne({ name: `category${ind}` });

            if (!category_exist) {
                let newCategory = new WorkoutCategory({ name: `category${ind}` });
                await newCategory.save();
                console.log(`WorkoutCategory "category${ind}" created`);
            }
        }

        console.log('WorkoutCategories created successfully');

    } catch (err) {
        console.error('Error while initialize workout_categories:', err.message);
    }
}

seedClients = async () => {
    const indecies = [1,2,3,4,5,6,7,8,9];
    const money = [0,10,50,100,300,500,700,1000,1500];
    for (const ind of indecies) {
        const role_id = (await Role.findOne({name: 'client'}))._id;
        const username = `Client${ind}`;
        const email = `client${ind}@gmail.com`;
        const password = `1234`;

        let user = new User({username, email, password, role_id});
        user = await user.save();

        const name = `Client${ind}`;
        const age = 20 + ind;
        const phone_number = `+375 29 ${ind}${ind}${ind}-${ind}${ind}-${ind}${ind}`;
        const expenses = money[ind - 1]
        const user_id = user._id;

        const client = new Client({name, age, phone_number, expenses, user_id});
        await client.save();
    }
}
seedInstructors = async () => {
    const indecies = [1,2,3,4,5,6,7,8,9];
    for (const ind of indecies) {
        const role_id = (await Role.findOne({name: 'instructor'}))._id;
        const username = `Instructor${ind}`;
        const email = `instructor${ind}@gmail.com`;
        const password = `1234`;

        let user = new User({username, email, password, role_id});
        user = await user.save();

        const name = `Instructor${ind}`;
        const age = 20 + ind;
        const phone_number = `+375 44 ${ind}${ind}${ind}-${ind}${ind}-${ind}${ind}`;
        const user_id = user._id;

        const instructor = new Instructor({name, age, phone_number, user_id});
        await instructor.save();
    }
}
seedClubCards = async () => {
    let clients = await Client.find();

    for (let client of clients) {
        let category = 'middle';
        if (client.expenses < 100) {
            category = 'simple';
        }
        if (client.expenses >= 1000) {
            category = 'VIP';
        }

        const category_id = (await ClubCardCategory.findOne({name: category}))._id
        let card = new ClubCard({category_id: category_id, end_date: new Date().setMonth(new Date().getMonth() + 1)});
        card = await card.save();
        client.card_id = card._id;
        await client.save();
    }
}

seedGroups = async () => {
    const indecies = [1,2,3,4,5]
    const prices = [30, 42, 50, 54, 60]
    const max_workout = [3,4,5,6,7];
    const max_client = [20, 18, 15, 13, 12]

    for (const ind of indecies) {
        const name = `Group${ind}`;
        const max_workouts = max_workout[ind - 1];
        const max_clients = max_client[ind - 1];
        const price = prices[ind - 1];

        const group = new Group({name, max_workouts, max_clients, price});
        await group.save();
    }
}
seedHalls = async () => {
    const indecies = [1,2,3,4,5]

    for (const ind of indecies) {
        const name = `Hall${ind}`;
        const city = 'Минск';
        const street = 'Якуба Колоса';
        const house_number = '28';

        const hall = new Hall({name, city, street, house_number});
        await hall.save();
    }
}
seedWorkouts = async () => {
    const groups = await Group.find();
    const halls = await Hall.find();
    const categories = await WorkoutCategory.find();
    let hall_index = 0;
    let category_index = 0;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day_index = 0;

    for (const group of groups) {
        let max_workout_amount = group.max_workouts;
        let workout_index = 0;
        while (workout_index < max_workout_amount * 0.7) {

            const workout =
                new Workout({day: days[day_index],
                                  category_id: categories[category_index]._id,
                                  group_id: group._id,
                                  hall_id: halls[hall_index]._id,});

            await workout.save();

            workout_index += 1;
            hall_index += 1;
            category_index += 1;
            day_index += 1;
            hall_index %= halls.length;
            category_index %= categories.length;
            day_index %= days.length;
        }
    }
}

seedReviews = async () => {}
seedCoupons = async () => {}

seedInstructorWorkout = async () => {
    let workouts = await Workout.find();
    let instructors = await Instructor.find();

    let workout_index = 0;

    for (let workout of workouts) {
        let instructor_amount = 1;
        if (workout_index % 3 === 0) instructor_amount = 2;
        if (workout_index % 6 === 0) instructor_amount = 3;

        let instructor_ind = 0;
        while(instructor_ind < instructor_amount) {
            const instructor_index = Math.floor((Math.random() * 100)) % instructors.length;
            const instructor_workout =
                new InstructorWorkout({instructor_id: instructors[instructor_index]._id, workout_id: workout._id});
            await instructor_workout.save();
            instructor_ind += 1;
        }

        workout_index += 1;
    }
}
seedClientGroup = async () => {
    let groups = await Group.find();
    let clients = await Client.find();

    for (let client of clients) {
        let group_index = Math.floor((Math.random() * 100)) % groups.length;

        const client_group = new ClientGroup({client_id: client._id, group_id: groups[group_index]._id});
        groups[group_index].current_clients += 1;
        await groups[group_index].save();
        await client_group.save();
    }
}

seedDatabase = async () => {
    await seedRoles();
    await seedClubCardCategories();
    await seedWorkoutCategories();

    // await seedClients();
    // await seedClubCards();
    // await seedCoupons();
    // await seedGroups();
    // await seedHalls();
    // await seedInstructors();
    // await seedReviews();
    // await seedWorkouts();
    //
    // await seedInstructorWorkout();
    // await seedClientGroup();
};

module.exports.seedDatabase = seedDatabase;