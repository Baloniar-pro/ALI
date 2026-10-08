import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import colors from "../../../theme/colors";
import { useWallet } from "../../wallet/context/WalletContext";
const textField = (key, label, placeholder, options = {}) => ({
    key,
    label,
    placeholder,
    required: true,
    ...options,
});
const choiceField = (key, label, choices) => ({
    key,
    label,
    choices,
    required: true,
});
const actionConfig = {
    add: {
        title: "Add money",
        description: "Choose a funding method and enter the amount to add to your demo wallet.",
        fields: [
            choiceField("method", "Funding method", ["Bank transfer", "Cash deposit", "Card"]),
            textField("reference", "Reference", "Add a note or reference", { required: false }),
        ],
        transactionTitle: "Money added",
        submitLabel: "Confirm demo deposit",
        kind: "income",
        icon: "arrow-down-outline",
    },
    send: {
        title: "Send money",
        description: "Enter the recipient details and amount for this demo transfer.",
        fields: [
            textField("recipient", "Recipient name", "Enter recipient's full name"),
            textField("account", "Account number or phone", "Enter account number or phone", { keyboardType: "phone-pad", autoCapitalize: "none" }),
            textField("note", "Payment note", "What is this transfer for?", { required: false }),
        ],
        transactionTitle: "Money sent",
        submitLabel: "Confirm demo transfer",
        kind: "expense",
        icon: "arrow-up-outline",
    },
    withdraw: {
        title: "Withdraw",
        description: "Choose a withdrawal method and enter where the funds should go.",
        fields: [
            choiceField("method", "Withdrawal method", ["Bank transfer", "Cash pickup", "ATM"]),
            textField("destination", "Account or destination", "Enter account number or destination"),
            textField("note", "Note", "Add a note", { required: false }),
        ],
        transactionTitle: "Money withdrawn",
        submitLabel: "Confirm demo withdrawal",
        kind: "expense",
        icon: "cash-outline",
    },
    loan: {
        title: "Record loan funds",
        description: "Record loan funds received. The amount will be added to your demo balance.",
        fields: [
            textField("lender", "Lender", "Enter lender or institution"),
            textField("reference", "Loan reference", "Enter loan reference", { required: false }),
            textField("purpose", "Loan purpose", "What is the loan for?", { required: false }),
        ],
        transactionTitle: "Loan received",
        submitLabel: "Record loan funds",
        kind: "income",
        icon: "document-text-outline",
    },
    bills: {
        title: "Pay a bill",
        description: "Enter the bill account details and payment amount.",
        fields: [
            textField("account", "Account or customer reference", "Enter account or reference"),
            textField("note", "Payment note", "Add a note", { required: false }),
        ],
        transactionTitle: "Bill payment",
        submitLabel: "Confirm demo payment",
        kind: "expense",
        icon: "receipt-outline",
    },
};
const serviceConfig = {
    airtime: {
        title: "Buy airtime",
        description: "Select a network and enter the phone number and top-up amount.",
        fields: [
            choiceField("network", "Mobile network", ["MTN", "Airtel", "Glo", "9mobile"]),
            textField("phone", "Phone number", "e.g. 08012345678", { keyboardType: "phone-pad", autoCapitalize: "none" }),
        ],
        transactionTitle: "Airtime purchase",
        submitLabel: "Confirm airtime purchase",
        icon: "phone-portrait-outline",
    },
    data: {
        title: "Buy data",
        description: "Choose a network and data bundle, then enter the recipient number.",
        fields: [
            choiceField("network", "Mobile network", ["MTN", "Airtel", "Glo", "9mobile"]),
            choiceField("plan", "Data bundle", ["1 GB", "2 GB", "5 GB", "10 GB"]),
            textField("phone", "Phone number", "e.g. 08012345678", { keyboardType: "phone-pad", autoCapitalize: "none" }),
        ],
        transactionTitle: "Data bundle purchase",
        submitLabel: "Confirm data purchase",
        icon: "cellular-outline",
    },
    electricity: {
        title: "Pay electricity bill",
        description: "Select your distribution company and meter type, then enter the meter number.",
        fields: [
            choiceField("provider", "Distribution company", ["IKEDC", "EKEDC", "AEDC", "IBEDC", "Other"]),
            choiceField("meterType", "Meter type", ["Prepaid", "Postpaid"]),
            textField("meter", "Meter number", "Enter meter number", { keyboardType: "number-pad", autoCapitalize: "none" }),
        ],
        transactionTitle: "Electricity bill payment",
        submitLabel: "Confirm electricity payment",
        icon: "flash-outline",
    },
    tv: {
        title: "Pay TV subscription",
        description: "Choose your TV provider and enter the decoder details.",
        fields: [
            choiceField("provider", "TV provider", ["DStv", "GOtv", "Showmax", "Other"]),
            textField("decoder", "Smart card / decoder number", "Enter decoder number", { keyboardType: "number-pad", autoCapitalize: "none" }),
            textField("package", "Subscription package", "Enter package name"),
        ],
        transactionTitle: "TV subscription payment",
        submitLabel: "Confirm TV payment",
        icon: "tv-outline",
    },
    internet: {
        title: "Pay internet bill",
        description: "Select your provider and enter the account and plan details.",
        fields: [
            choiceField("provider", "Internet provider", ["MTN", "Airtel", "Spectranet", "Other"]),
            textField("account", "Internet account number", "Enter account or customer reference", { autoCapitalize: "none" }),
            textField("plan", "Plan or bundle", "Enter plan name"),
        ],
        transactionTitle: "Internet bill payment",
        submitLabel: "Confirm internet payment",
        icon: "wifi-outline",
    },
    education: {
        title: "Pay education fees",
        description: "Enter the institution, student reference, and fee type.",
        fields: [
            textField("institution", "School or institution", "Enter institution name"),
            textField("student", "Student ID or reference", "Enter student ID or reference", { autoCapitalize: "none" }),
            textField("fee", "Fee type", "e.g. Tuition, exam fee"),
        ],
        transactionTitle: "Education fee payment",
        submitLabel: "Confirm fee payment",
        icon: "school-outline",
    },
    betting: {
        title: "Fund betting wallet",
        description: "Select an operator and enter the account to fund.",
        fields: [
            choiceField("operator", "Betting operator", ["SportyBet", "Bet9ja", "BetKing", "Other"]),
            textField("otherOperator", "Betting platform", "Enter platform name", {
                showWhen: { key: "operator", value: "Other" },
            }),
            textField("account", "Account ID or phone", "Enter account ID or phone", { autoCapitalize: "none" }),
        ],
        transactionTitle: "Betting wallet funding",
        submitLabel: "Confirm wallet funding",
        icon: "football-outline",
    },
    water: {
        title: "Pay water bill",
        description: "Select your water provider and enter your customer reference.",
        fields: [
            textField("provider", "Water provider", "Enter provider or utility name"),
            textField("account", "Customer / meter number", "Enter customer or meter reference", { autoCapitalize: "none" }),
        ],
        transactionTitle: "Water bill payment",
        submitLabel: "Confirm water payment",
        icon: "water-outline",
    },
    transport: {
        title: "Pay for transport",
        description: "Enter the transport provider and booking reference.",
        fields: [
            textField("provider", "Transport provider", "Enter provider name"),
            textField("reference", "Booking or ticket reference", "Enter booking reference", { autoCapitalize: "none" }),
        ],
        transactionTitle: "Transport payment",
        submitLabel: "Confirm transport payment",
        icon: "bus-outline",
    },
    insurance: {
        title: "Pay insurance premium",
        description: "Enter the insurer and policy details for this demo payment.",
        fields: [
            textField("provider", "Insurance provider", "Enter insurer name"),
            textField("policy", "Policy number", "Enter policy number", { autoCapitalize: "none" }),
        ],
        transactionTitle: "Insurance premium payment",
        submitLabel: "Confirm premium payment",
        icon: "shield-checkmark-outline",
    },
    government: {
        title: "Pay government service",
        description: "Select the agency and enter the payment reference.",
        fields: [
            textField("agency", "Agency or department", "Enter agency name"),
            textField("reference", "Payment reference", "Enter payment reference", { autoCapitalize: "none" }),
            textField("service", "Service or fee type", "Enter service or fee"),
        ],
        transactionTitle: "Government service payment",
        submitLabel: "Confirm demo payment",
        icon: "business-outline",
    },
};
export default function ActionDetailsScreen({ navigation, route, }) {
    const { action } = route.params;
    const baseConfig = actionConfig[action] ?? actionConfig.bills;
    const service = route.params.service?.toLowerCase();
    const config = service ? { ...baseConfig, ...serviceConfig[service] } : baseConfig;
    const { isReady, recordTransaction } = useWallet();
    const [formValues, setFormValues] = useState({});
    const [amountText, setAmountText] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const visibleFields = config.fields.filter(
        (field) => !field.showWhen ||
            formValues[field.showWhen.key] === field.showWhen.value,
    );
    const handleSave = async () => {
        const amountValue = Number(amountText.replace(/,/g, "").trim());
        const missingField = visibleFields.find(
            (field) => field.required && !formValues[field.key]?.trim(),
        );
        if (missingField) {
            Alert.alert("Complete the required details", `Enter ${missingField.label.toLowerCase()} to continue.`);
            return;
        }
        if (!Number.isFinite(amountValue) || amountValue <= 0) {
            Alert.alert("Check the amount", "Enter an amount greater than zero.");
            return;
        }
        setIsSaving(true);
        try {
            const transactionDetails = visibleFields
                .filter((field) => formValues[field.key]?.trim())
                .map((field) => `${field.label}: ${formValues[field.key].trim()}`)
                .join(" · ");
            await recordTransaction({
                title: config.transactionTitle,
                detail: `${transactionDetails} · Demo`,
                amountValue,
                kind: config.kind,
                icon: config.icon,
            });
            Alert.alert("Demo activity saved", "Your demo wallet has been updated on this device. No real payment was made.", [{ text: "Done", onPress: () => navigation.goBack() }]);
        }
        catch (error) {
            Alert.alert("Could not save transaction", error instanceof Error ? error.message : "Please check the details and try again.");
        }
        finally {
            setIsSaving(false);
        }
    };
    return (<SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TouchableOpacity accessibilityLabel="Go back" accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={19} color={colors.primary}/>
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>

          <View style={styles.actionIcon}>
            <Ionicons name={config.icon} size={26} color={colors.primary}/>
          </View>
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.subtitle}>{config.description}</Text>

          <View style={styles.form}>
            <Text style={styles.formHeading}>Details</Text>
            {visibleFields.map((field) => (
              <View key={field.key}>
                <Text style={styles.fieldLabel}>
                  {field.label}{field.required ? "" : " (optional)"}
                </Text>
                {field.choices ? (
                  <View accessibilityLabel={field.label} style={styles.choiceList}>
                    {field.choices.map((choice) => {
                      const isSelected = formValues[field.key] === choice;
                      return (
                        <TouchableOpacity
                          key={choice}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isSelected }}
                          onPress={() => setFormValues((values) => ({ ...values, [field.key]: choice }))}
                          style={[styles.choice, isSelected && styles.choiceSelected]}
                        >
                          <Text style={[styles.choiceLabel, isSelected && styles.choiceLabelSelected]}>
                            {choice}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <TextInput
                    accessibilityLabel={field.label}
                    autoCapitalize={field.autoCapitalize ?? "words"}
                    keyboardType={field.keyboardType}
                    onChangeText={(value) => setFormValues((values) => ({ ...values, [field.key]: value }))}
                    placeholder={field.placeholder}
                    placeholderTextColor={colors.muted}
                    style={styles.textInput}
                    value={formValues[field.key] ?? ""}
                  />
                )}
              </View>
            ))}
            <View>
              <Text style={styles.fieldLabel}>Amount</Text>
              <View style={styles.amountInput}>
                <Text style={styles.currencySymbol}>₦</Text>
                <TextInput accessibilityLabel="Amount in naira" keyboardType="decimal-pad" onChangeText={setAmountText} placeholder="0.00" placeholderTextColor={colors.muted} style={styles.amountTextInput} value={amountText}/>
              </View>
            </View>
          </View>

          <View style={styles.notice}>
            <Ionicons name="information-circle-outline" size={19} color={colors.success}/>
            <Text style={styles.noticeText}>
              Demo only. This updates sample wallet data on this device; no real payment is made.
            </Text>
          </View>

          <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: !isReady || isSaving }} disabled={!isReady || isSaving} onPress={handleSave} style={[styles.submitButton, (!isReady || isSaving) && styles.submitButtonDisabled]}>
            <Text style={styles.submitButtonText}>
              {!isReady ? "Loading wallet..." : isSaving ? "Saving..." : config.submitLabel}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    keyboardAvoidingView: { flex: 1 },
    content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 12, paddingBottom: 28 },
    backButton: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 21,
        backgroundColor: colors.surface,
    },
    backLabel: { color: colors.primary, fontSize: 14, fontWeight: "600" },
    actionIcon: {
        width: 54,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
        borderRadius: 17,
        backgroundColor: colors.primaryLight,
    },
    title: { marginTop: 18, color: colors.text, fontSize: 26, fontWeight: "700" },
    subtitle: { marginTop: 7, color: colors.muted, fontSize: 13, lineHeight: 19 },
    form: { gap: 17, marginTop: 25 },
    formHeading: { color: colors.text, fontSize: 16, fontWeight: "700" },
    fieldLabel: { marginBottom: 8, color: colors.text, fontSize: 13, fontWeight: "600" },
    textInput: {
        height: 52,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 13,
        backgroundColor: colors.surface,
        color: colors.text,
        fontSize: 14,
    },
    choiceList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    choice: {
        minHeight: 38,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 19,
        backgroundColor: colors.surface,
    },
    choiceSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
    choiceLabel: { color: colors.muted, fontSize: 12, fontWeight: "500" },
    choiceLabelSelected: { color: colors.primary, fontWeight: "700" },
    amountInput: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 13,
        backgroundColor: colors.surface,
    },
    currencySymbol: { color: colors.text, fontSize: 16, fontWeight: "700" },
    amountTextInput: { flex: 1, marginLeft: 10, color: colors.text, fontSize: 16 },
    notice: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 9,
        marginTop: 21,
        padding: 13,
        borderRadius: 13,
        backgroundColor: colors.primaryLight,
    },
    noticeText: { flex: 1, color: colors.primary, fontSize: 11, lineHeight: 16 },
    submitButton: {
        minHeight: 54,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 21,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },
    submitButtonDisabled: { opacity: 0.55 },
    submitButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
});
