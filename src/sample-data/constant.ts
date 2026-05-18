const policyTypes = ["auto", "home", "life"] as const;
const billingFrequencies = ["monthly", "quarterly", "annual"] as const;
const policyStatuses = ["active", "active", "active", "cancelled"] as const;
const incidentTypes = [
	"collision",
	"theft",
	"property_damage",
	"medical",
	"liability",
] as const;
const paymentMethods = ["credit_card", "debit_card", "bank_transfer"] as const;
const claimStatuses = [
	"submitted",
	"under_review",
	"approved",
	"paid",
	"denied",
] as const;
const vehicleMakes = [
	"Toyota",
	"Honda",
	"Ford",
	"Chevrolet",
	"Nissan",
] as const;
const vehicleModels = ["Camry", "Civic", "F-150", "Malibu", "Altima"] as const;
const states = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA"] as const;

export {
	policyTypes,
	billingFrequencies,
	policyStatuses,
	incidentTypes,
	paymentMethods,
	claimStatuses,
	vehicleMakes,
	vehicleModels,
	states,
};
