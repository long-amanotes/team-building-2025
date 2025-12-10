import type { BudgetItem, BudgetSummary, BankInfo } from '@/types';

export const budgetItems: BudgetItem[] = [
  { id: 1, description: "Xe 29 chỗ khứ hồi SG - MN", unitPrice: 10000000, quantity: 1, vat: 800000, total: 10800000, note: "Đã bao gồm full phí + tài xế đi theo lịch trình khách" },
  { id: 2, description: "Resort - gói BB (Bed & Breakfast)", unitPrice: 1440000, quantity: 18, vat: 0, total: 25920000, note: "Đã bao gồm thuế, phí" },
  { id: 3, description: "1 giường phụ", unitPrice: 1010000, quantity: 1, vat: 0, total: 1010000 },
  { id: 4, description: "Ăn trưa ngày 18", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
  { id: 5, description: "Ăn tối ngày 18", unitPrice: 290000, quantity: 35, vat: 0, total: 10150000 },
  { id: 6, description: "Ăn trưa ngày 19", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
];

export const budgetSummary: BudgetSummary = {
  subtotal: 59880000,
  contingencyRate: 0.05,
  contingency: 2994000,
  total: 62874000,

  // NGD specific
  ngdHeadcount: 32,
  ngdBudget: 44536800,
  totalExcludeFamily: 60187333,
  additionalCost: 15650533,
  additionalPerPax: 460310,

  // Family members
  familyMemberCount: 2,
  perPaxFamily: 1343333,
  familyTotal: 2686667,
};

export const bankInfo: BankInfo = {
  accountName: "Công ty TNHH Đầu Tư Bảo Thạch",
  bankName: "Ngân hàng TMCP Quân Đội - Chi nhánh Khánh Hòa",
  accountNumber: "3163436017463",
};
