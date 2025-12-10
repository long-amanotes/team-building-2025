import { useState } from 'react';
import {
  Wallet,
  Receipt,
  Users,
  Copy,
  Check,
  Building2,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { budgetItems, budgetSummary, bankInfo } from '@/data/budget';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

function BudgetSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyBankInfo = async () => {
    const text = `
Tên TK: ${bankInfo.accountName}
Ngân hàng: ${bankInfo.bankName}
Số TK: ${bankInfo.accountNumber}
    `.trim();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 shadow-lg shadow-primary/25">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(budgetSummary.subtotal)}
              </p>
              <p className="text-sm text-muted-foreground">Tạm tính</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(budgetSummary.contingency)}
              </p>
              <p className="text-sm text-muted-foreground">Dự phòng (5%)</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(budgetSummary.total)}
              </p>
              <p className="text-sm text-muted-foreground">Tổng chi phí</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(budgetSummary.additionalPerPax)}
              </p>
              <p className="text-sm text-muted-foreground">Đóng thêm / người</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            Chi tiết ngân sách
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">#</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mô tả</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Đơn giá</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">SL</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">VAT</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      'border-b border-border/50 transition-colors hover:bg-muted/30',
                      'animate-fade-in'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-4 py-3 text-muted-foreground">{item.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.description}</p>
                      {item.note && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {item.vat > 0 ? formatCurrency(item.vat) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/20">
                  <td colSpan={5} className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Tạm tính
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-foreground">
                    {formatCurrency(budgetSummary.subtotal)}
                  </td>
                </tr>
                <tr className="bg-muted/20">
                  <td colSpan={5} className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Dự phòng (5%)
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(budgetSummary.contingency)}
                  </td>
                </tr>
                <tr className="bg-gradient-to-r from-primary/10 to-sky-500/10">
                  <td colSpan={5} className="px-4 py-4 text-right font-semibold text-foreground">
                    TỔNG CỘNG
                  </td>
                  <td className="px-4 py-4 text-right text-xl font-bold text-primary">
                    {formatCurrency(budgetSummary.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Calculation */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              Tính toán đóng góp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
                <span className="text-muted-foreground">NGD Headcount</span>
                <span className="font-semibold text-foreground">{budgetSummary.ngdHeadcount} người</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
                <span className="text-muted-foreground">Budget từ công ty</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(budgetSummary.ngdBudget)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
                <span className="text-muted-foreground">Chi phí cần thêm</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {formatCurrency(budgetSummary.additionalCost)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 p-4">
                <span className="font-medium text-foreground">Mỗi người đóng thêm</span>
                <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
                  {formatCurrency(budgetSummary.additionalPerPax)}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Thành viên đi cùng gia đình: {formatCurrency(budgetSummary.perPaxFamily)} / người thân
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Info */}
        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              Thông tin chuyển khoản
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Tên tài khoản</p>
                <p className="mt-1 font-semibold text-foreground">{bankInfo.accountName}</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Ngân hàng</p>
                <p className="mt-1 font-semibold text-foreground">{bankInfo.bankName}</p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Số tài khoản</p>
                <p className="mt-1 text-xl font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                  {bankInfo.accountNumber}
                </p>
              </div>
            </div>

            <Button
              onClick={handleCopyBankInfo}
              variant="secondary"
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Đã copy!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy thông tin
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { BudgetSection };
