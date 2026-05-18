import { readFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createSampleData } from "../sample-data/createSampleData.js";

const dbFileUrl = path.resolve(import.meta.dirname, "insurance.db");

export const db = new DatabaseSync(dbFileUrl, {
	open: false,
});

export function connectDB() {
	db.open();
}

function loadSchemaSql() {
	const schemaUrl = new URL("./schema.sql", import.meta.url);
	return readFileSync(schemaUrl, "utf-8");
}

export function initializeDatabase() {
	const schemaSql = loadSchemaSql();
	db.exec(schemaSql);
}

export function insertSampleData() {
	const {
		customers,
		policies,
		auto_policy_details,
		billing,
		payments,
		claims,
	} = createSampleData();

	const insertCustomer = db.prepare(`
		INSERT INTO customers (
			customer_id,
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			state
		) VALUES (?, ?, ?, ?, ?, ?, ?)
	`);
	for (const customer of customers) {
		insertCustomer.run(
			customer.customer_id,
			customer.first_name,
			customer.last_name,
			customer.email,
			customer.phone,
			customer.date_of_birth.toISOString().slice(0, 10),
			customer.state,
		);
	}

	const insertPolicy = db.prepare(`
		INSERT INTO policies (
			policy_number,
			customer_id,
			policy_type,
			start_date,
			premium_amount,
			billing_frequency,
			status
		) VALUES (?, ?, ?, ?, ?, ?, ?)
	`);
	for (const policy of policies) {
		insertPolicy.run(
			policy.policy_number,
			policy.customer_id,
			policy.policy_type,
			policy.start_date.toISOString().slice(0, 10),
			policy.premium_amount,
			policy.billing_frequency,
			policy.status,
		);
	}

	const insertAutoPolicyDetails = db.prepare(`
		INSERT INTO auto_policy_details (
			policy_number,
			vehicle_vin,
			vehicle_make,
			vehicle_model,
			vehicle_year,
			liability_limit,
			collision_deductible,
			comprehensive_deductible,
			uninsured_motorist,
			rental_car_coverage
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`);
	for (const autoPolicy of auto_policy_details) {
		insertAutoPolicyDetails.run(
			autoPolicy.policy_number,
			autoPolicy.vehicle_vin,
			autoPolicy.vehicle_make,
			autoPolicy.vehicle_model,
			autoPolicy.vehicle_year,
			autoPolicy.liability_limit,
			autoPolicy.collision_deductible,
			autoPolicy.comprehensive_deductible,
			autoPolicy.uninsured_motorist,
			autoPolicy.rental_car_coverage,
		);
	}

	const insertBilling = db.prepare(`
		INSERT INTO billing (
			bill_id,
			policy_number,
			billing_date,
			due_date,
			amount_due,
			status
		) VALUES (?, ?, ?, ?, ?, ?)
	`);
	for (const bill of billing) {
		insertBilling.run(
			bill.bill_id,
			bill.policy_number,
			bill.billing_date.toISOString().slice(0, 10),
			bill.due_date.toISOString().slice(0, 10),
			bill.amount_due,
			bill.status,
		);
	}

	const insertPayment = db.prepare(`
		INSERT INTO payments (
			payment_id,
			bill_id,
			payment_date,
			amount,
			payment_method,
			transaction_id,
			status
		) VALUES (?, ?, ?, ?, ?, ?, ?)
	`);
	for (const payment of payments) {
		insertPayment.run(
			payment.payment_id,
			payment.bill_id,
			payment.payment_date.toISOString().slice(0, 10),
			payment.amount,
			payment.payment_method,
			payment.transaction_id,
			payment.status,
		);
	}

	const insertClaim = db.prepare(`
		INSERT INTO claims (
			claim_id,
			policy_number,
			claim_date,
			incident_type,
			estimated_loss,
			status
		) VALUES (?, ?, ?, ?, ?, ?)
	`);
	for (const claim of claims) {
		insertClaim.run(
			claim.claim_id,
			claim.policy_number,
			claim.claim_date.toISOString().slice(0, 10),
			claim.incident_type,
			claim.estimated_loss,
			claim.status,
		);
	}
}

export function resetDatabase() {
	db.exec(`
        DROP TABLE IF EXISTS claims;
        DROP TABLE IF EXISTS payments;
        DROP TABLE IF EXISTS billing;
        DROP TABLE IF EXISTS auto_policy_details;
        DROP TABLE IF EXISTS policies;
        DROP TABLE IF EXISTS customers;
    `);

	const schemaSql = loadSchemaSql();
	db.exec(schemaSql);
}
