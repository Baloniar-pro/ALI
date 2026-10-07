import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { QuickAction, RootStackParamList } from "../navigation/types";

type ActionDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ActionDetails"
>;
type TopUpCategory = "airtime" | "data" | "betting" | "electricity" | "tv";

const topUpCategories: {
  id: TopUpCategory;
  label: string;
  icon: ComponentProps<typeof FontAwesome>["name"];
  recipientLabel: string;
  recipientPlaceholder: string;
}[] = [
  {
    id: "airtime",
    label: "Airtime",
    icon: "phone",
    recipientLabel: "Phone number",
    recipientPlaceholder: "Enter phone number",
  },
  {
    id: "data",
    label: "Data",
    icon: "wifi",
    recipientLabel: "Phone number",
    recipientPlaceholder: "Enter phone number",
  },
  {
    id: "betting",
    label: "Betting",
    icon: "ticket",
    recipientLabel: "Betting account ID",
    recipientPlaceholder: "Enter betting account ID",
  },
  {
    id: "electricity",
    label: "Electricity",
    icon: "bolt",
    recipientLabel: "Meter number",
    recipientPlaceholder: "Enter meter number",
  },
  {
    id: "tv",
    label: "TV",
    icon: "tv",
    recipientLabel: "Smartcard / IUC number",
    recipientPlaceholder: "Enter smartcard or IUC number",
  },
];

const actionTitles: Record<QuickAction, string> = {
  send: "Send money",
  receive: "Request money",
  topup: "Bills & subscriptions",
};

export default function ActionDetailsScreen({
  navigation,
  route,
}: ActionDetailsScreenProps) {
  const { action } = route.params;
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [narration, setNarration] = useState("");
  const [requestFrom, setRequestFrom] = useState("");
  const [requestContact, setRequestContact] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestNarration, setRequestNarration] = useState("");
  const [topUpCategory, setTopUpCategory] = useState<TopUpCategory>("airtime");
  const [topUpProvider, setTopUpProvider] = useState("");
  const [topUpRecipient, setTopUpRecipient] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");
  const title = actionTitles[action];
  const transferAmount = Number(amount.replace(/,/g, ""));
  const isSendFormComplete =
    accountNumber.trim().length > 0 &&
    bankName.trim().length > 0 &&
    Number.isFinite(transferAmount) &&
    transferAmount > 0;
  const selectedTopUpCategory = topUpCategories.find(
    (category) => category.id === topUpCategory,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={17} color="#183b34" />
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {action === "send" && "Enter the recipient and transfer details."}
          {action === "receive" && "Enter the details of the person you want to request money from."}
          {action === "topup" && "Choose a service and enter the details to top it up."}
        </Text>

        {action === "topup" && selectedTopUpCategory && (
          <View style={styles.transferForm}>
            <Text style={styles.formTitle}>Choose a service</Text>
            <View style={styles.topUpCategories}>
              {topUpCategories.map((category) => {
                const isSelected = topUpCategory === category.id;

                return (
                  <TouchableOpacity
                    key={category.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      setTopUpCategory(category.id);
                      setTopUpProvider("");
                      setTopUpRecipient("");
                      setTopUpAmount("");
                    }}
                    style={[
                      styles.topUpCategory,
                      isSelected && styles.topUpCategorySelected,
                    ]}
                  >
                    <FontAwesome
                      name={category.icon}
                      size={18}
                      color={isSelected ? "#ffffff" : "#24734e"}
                    />
                    <Text
                      style={[
                        styles.topUpCategoryLabel,
                        isSelected && styles.topUpCategoryLabelSelected,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>Provider</Text>
            <TextInput
              accessibilityLabel={`${selectedTopUpCategory.label} provider`}
              autoCapitalize="words"
              onChangeText={setTopUpProvider}
              placeholder="Enter provider (e.g. MTN)"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={topUpProvider}
            />
            <Text style={styles.fieldLabel}>{selectedTopUpCategory.recipientLabel}</Text>
            <TextInput
              accessibilityLabel={selectedTopUpCategory.recipientLabel}
              keyboardType={
                topUpCategory === "airtime" || topUpCategory === "data"
                  ? "phone-pad"
                  : "default"
              }
              onChangeText={setTopUpRecipient}
              placeholder={selectedTopUpCategory.recipientPlaceholder}
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={topUpRecipient}
            />
            <Text style={styles.fieldLabel}>Amount</Text>
            <TextInput
              accessibilityLabel="Top-up amount"
              keyboardType="decimal-pad"
              onChangeText={setTopUpAmount}
              placeholder="₦0.00"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={topUpAmount}
            />
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                if (
                  !topUpProvider.trim() ||
                  !topUpRecipient.trim() ||
                  !topUpAmount.trim()
                ) {
                  Alert.alert(
                    "Missing details",
                    "Enter the provider, recipient details, and amount to continue.",
                  );
                  return;
                }

                Alert.alert(
                  "Top-up preview",
                  `${selectedTopUpCategory.label} · ${topUpProvider.trim()}\nTo: ${topUpRecipient.trim()}\nAmount: ₦${topUpAmount}\n\nThis top-up has not been completed.`,
                );
              }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Preview top up</Text>
            </TouchableOpacity>
            <Text style={styles.formNote}>
              Bill and subscription payments are not connected yet. This only previews your details.
            </Text>
          </View>
        )}

        {action === "receive" && (
          <View style={styles.transferForm}>
            <Text style={styles.formTitle}>Request money</Text>
            <Text style={styles.formDescription}>
              Enter the details of the person you want to request money from.
            </Text>
            <Text style={styles.fieldLabel}>Request from</Text>
            <TextInput
              accessibilityLabel="Person to request money from"
              autoCapitalize="words"
              onChangeText={setRequestFrom}
              placeholder="Enter their name"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={requestFrom}
            />
            <Text style={styles.fieldLabel}>Phone, email, or account number</Text>
            <TextInput
              accessibilityLabel="Contact or account number of person to request from"
              autoCapitalize="none"
              onChangeText={setRequestContact}
              placeholder="Enter their contact or account number"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={requestContact}
            />
            <Text style={styles.fieldLabel}>Amount</Text>
            <TextInput
              accessibilityLabel="Requested amount"
              keyboardType="decimal-pad"
              onChangeText={setRequestAmount}
              placeholder="₦0.00"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={requestAmount}
            />
            <Text style={styles.fieldLabel}>Description (Optional)</Text>
            <TextInput
              accessibilityLabel="Request description"
              onChangeText={setRequestDescription}
              placeholder="What is the money for?"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={requestDescription}
            />
            <Text style={styles.fieldLabel}>Narration (Optional)</Text>
            <TextInput
              accessibilityLabel="Request narration"
              onChangeText={setRequestNarration}
              placeholder="Add a note for the person"
              placeholderTextColor="#89948f"
              style={[styles.textInput, styles.multilineInput]}
              value={requestNarration}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                if (!requestFrom.trim() || !requestAmount.trim()) {
                  Alert.alert(
                    "Missing details",
                    "Enter the person's name and the amount you want to request.",
                  );
                  return;
                }

                Alert.alert(
                  "Request preview",
                  `Request ₦${requestAmount} from ${requestFrom.trim()}${
                    requestContact.trim() ? ` (${requestContact.trim()})` : ""
                  }${requestDescription.trim() ? `\n\nDescription: ${requestDescription.trim()}` : ""}${
                    requestNarration.trim() ? `\nNarration: ${requestNarration.trim()}` : ""
                  }\n\nThis request has not been sent.`,
                );
              }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Preview request</Text>
            </TouchableOpacity>
            <Text style={styles.formNote}>
              Requests are not sent yet. This button only previews the details.
            </Text>
          </View>
        )}

        {action === "send" && (
          <View style={styles.transferForm}>
            <Text style={styles.formTitle}>Transfer details</Text>
            <Text style={styles.fieldLabel}>Recipient name (Optional)</Text>
            <TextInput
              accessibilityLabel="Recipient name"
              autoCapitalize="words"
              onChangeText={setRecipientName}
              placeholder="Enter recipient's name"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={recipientName}
            />
            <Text style={styles.fieldLabel}>Account number</Text>
            <TextInput
              accessibilityLabel="Recipient account number"
              keyboardType="number-pad"
              onChangeText={setAccountNumber}
              placeholder="Enter account number"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={accountNumber}
            />
            <Text style={styles.fieldLabel}>Bank name</Text>
            <TextInput
              accessibilityLabel="Recipient bank name"
              autoCapitalize="words"
              onChangeText={setBankName}
              placeholder="Enter bank name"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={bankName}
            />
            <Text style={styles.lookupNote}>
              Account-name verification is not connected. You can enter the name manually.
            </Text>
            <Text style={styles.fieldLabel}>Amount</Text>
            <TextInput
              accessibilityLabel="Transfer amount"
              keyboardType="decimal-pad"
              onChangeText={setAmount}
              placeholder="₦0.00"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={amount}
            />
            <Text style={styles.fieldLabel}>Description (Optional)</Text>
            <TextInput
              accessibilityLabel="Transfer description, optional"
              onChangeText={setDescription}
              placeholder="What is this transfer for?"
              placeholderTextColor="#89948f"
              style={styles.textInput}
              value={description}
            />
            <Text style={styles.fieldLabel}>Narration (Optional)</Text>
            <TextInput
              accessibilityLabel="Transfer narration, optional"
              onChangeText={setNarration}
              placeholder="Add a note for the recipient"
              placeholderTextColor="#89948f"
              style={[styles.textInput, styles.multilineInput]}
              value={narration}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ disabled: !isSendFormComplete }}
              disabled={!isSendFormComplete}
              onPress={() => {
                Alert.alert(
                  "Transfer preview",
                  `To: ${recipientName.trim() || "Name not provided"}\nAccount number: ${accountNumber.trim()}\nBank: ${bankName.trim()}\nAmount: ₦${transferAmount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}${description.trim() ? `\nDescription: ${description.trim()}` : ""}${
                    narration.trim() ? `\nNarration: ${narration.trim()}` : ""
                  }\n\nThis transfer has not been sent. Transfers are not enabled yet.`,
                );
              }}
              style={[
                styles.submitButton,
                !isSendFormComplete && styles.submitButtonDisabled,
              ]}
            >
              <Text style={styles.submitButtonText}>Send money</Text>
            </TouchableOpacity>
            <Text style={styles.formNote}>
              The button becomes available when an account number, bank name, and valid amount are entered. Transfers are not enabled yet.
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 9,
    paddingVertical: 8,
  },
  backLabel: { color: "#183b34", fontSize: 14, fontWeight: "600" },
  title: { marginTop: 24, color: "#183b34", fontSize: 25, fontWeight: "700" },
  subtitle: { marginTop: 7, color: "#74817b", fontSize: 14, lineHeight: 20 },
  detailsCard: {
    marginTop: 22,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 14,
    borderRadius: 12,
    backgroundColor: "#f5f8f6",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e9e4",
  },
  detailLabel: { color: "#74817b", fontSize: 13 },
  detailValue: {
    flexShrink: 1,
    color: "#183b34",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  note: { marginTop: 12, color: "#74817b", fontSize: 12, lineHeight: 18 },
  transferForm: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f8f6",
  },
  formTitle: { marginBottom: 16, color: "#183b34", fontSize: 16, fontWeight: "700" },
  formDescription: { marginBottom: 4, color: "#74817b", fontSize: 13, lineHeight: 19 },
  topUpCategories: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  topUpCategory: {
    width: "31%",
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: "#dce5df",
    borderRadius: 9,
    backgroundColor: "#ffffff",
  },
  topUpCategorySelected: { borderColor: "#24734e", backgroundColor: "#24734e" },
  topUpCategoryLabel: { color: "#202b27", fontSize: 11, fontWeight: "600" },
  topUpCategoryLabelSelected: { color: "#ffffff" },
  fieldLabel: { marginTop: 12, marginBottom: 6, color: "#202b27", fontSize: 13, fontWeight: "600" },
  textInput: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#dce5df",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#202b27",
    fontSize: 14,
  },
  lookupNote: { marginTop: 7, color: "#74817b", fontSize: 11, lineHeight: 16 },
  multilineInput: { minHeight: 84, paddingTop: 12 },
  submitButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    borderRadius: 8,
    backgroundColor: "#183b34",
  },
  submitButtonDisabled: { opacity: 0.45 },
  submitButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
  formNote: { marginTop: 14, color: "#74817b", fontSize: 12, lineHeight: 18 },
});
