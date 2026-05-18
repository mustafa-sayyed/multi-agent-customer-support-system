import { faker } from "@faker-js/faker";
import {
	billingFrequencies,
	claimStatuses,
	incidentTypes,
	paymentMethods,
	policyStatuses,
	policyTypes,
	states,
	vehicleMakes,
	vehicleModels,
} from "./constant.js";

export function createSampleData(seed: number = 1) {
	faker.seed(seed);

	const customers = [];
	for (let i = 0; i < 1000; i++) {
		customers.push({
			customer_id: faker.string.uuid(),
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			phone: faker.phone.number(),
			date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
			state: faker.helpers.arrayElement(states),
		});
	}

	const policies = [];
	for (let i = 0; i < 1500; i++) {
		policies.push({
			policy_number: `POL${String(i + 1).padStart(6, "0")}`,
			customer_id: faker.helpers.arrayElement(customers).customer_id,
			policy_type: faker.helpers.arrayElement(policyTypes),
			start_date: faker.date.between({ from: "2023-01-01", to: "2023-12-31" }),
			premium_amount: Number(
				faker.finance.amount({ min: 50, max: 500, dec: 2 }),
			),
			billing_frequency: faker.helpers.arrayElement(billingFrequencies),
			status: faker.helpers.arrayElement(policyStatuses),
		});
	}

	const autoPolicies = policies.filter(
		(policy) => policy.policy_type === "auto",
	);
	const auto_policy_details = autoPolicies.map((policy) => ({
		policy_number: policy.policy_number,
		vehicle_vin: `VIN${faker.number.int({ min: 10 ** 16, max: 10 ** 17 - 1 })}`,
		vehicle_make: faker.helpers.arrayElement(vehicleMakes),
		vehicle_model: faker.helpers.arrayElement(vehicleModels),
		vehicle_year: faker.number.int({ min: 2015, max: 2023 }),
		liability_limit: faker.helpers.arrayElement([50000, 100000, 300000]),
		collision_deductible: faker.helpers.arrayElement([250, 500, 1000]),
		comprehensive_deductible: faker.helpers.arrayElement([250, 500, 1000]),
		uninsured_motorist: faker.helpers.arrayElement([0, 1]),
		rental_car_coverage: faker.helpers.arrayElement([0, 1]),
	}));

	const billing = [];
	for (let i = 0; i < 5000; i++) {
		billing.push({
			bill_id: `BILL${String(i + 1).padStart(6, "0")}`,
			policy_number: faker.helpers.arrayElement(policies).policy_number,
			billing_date: faker.date.between({
				from: "2024-01-01",
				to: "2024-03-31",
			}),
			due_date: faker.date.between({ from: "2024-01-15", to: "2024-04-15" }),
			amount_due: Number(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
			status: faker.helpers.arrayElement(["paid", "pending", "overdue"]),
		});
	}

	const payments = [];
	for (let i = 0; i < 4000; i++) {
		payments.push({
			payment_id: `PAY${String(i + 1).padStart(6, "0")}`,
			bill_id: faker.helpers.arrayElement(billing).bill_id,
			payment_date: faker.date.between({
				from: "2024-01-01",
				to: "2024-03-31",
			}),
			amount: Number(faker.finance.amount({ min: 50, max: 500, dec: 2 })),
			payment_method: faker.helpers.arrayElement(paymentMethods),
			transaction_id: `TXN${faker.number.int({ min: 100000, max: 999999 })}`,
			status: faker.helpers.arrayElement(["completed", "pending", "failed"]),
		});
	}

	const claims = [];
	for (let i = 0; i < 300; i++) {
		claims.push({
			claim_id: `CLM${String(i + 1).padStart(6, "0")}`,
			policy_number: faker.helpers.arrayElement(policies).policy_number,
			claim_date: faker.date.between({ from: "2024-01-01", to: "2024-03-31" }),
			incident_type: faker.helpers.arrayElement(incidentTypes),
			estimated_loss: Number(
				faker.finance.amount({ min: 500, max: 20000, dec: 2 }),
			),
			status: faker.helpers.arrayElement(claimStatuses),
		});
	}

	return {
		customers,
		policies,
		auto_policy_details,
		billing,
		payments,
		claims,
	};
}
