import { useState, useEffect } from 'react';
import {
  Wallet,
  Receipt,
  Users,
  Copy,
  Check,
  CreditCard,
  AlertCircle,
  QrCode,
  Smartphone,
  Activity,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { budgetItems, budgetSummary, bankInfo, momoFundUrl } from '@/data/budget';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { MoMoActivity } from '@/types';
import paymentQRImage from '@/assets/Images/payment-info.png';

function BudgetSection() {
  const [copied, setCopied] = useState<'all' | 'account' | null>(null);
  const [activities, setActivities] = useState<MoMoActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

  const handleCopyBankInfo = async () => {
    const text = `
Tên TK: ${bankInfo.accountName}
Ngân hàng: ${bankInfo.bankName}
Số TK: ${bankInfo.accountNumber}
    `.trim();

    await navigator.clipboard.writeText(text);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAccountNumber = async () => {
    await navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopied('account');
    setTimeout(() => setCopied(null), 2000);
  };

  const fetchActivities = async () => {
    setLoadingActivities(true);
    setActivitiesError(null);
    try {
      const response = await fetch(`/api/momo-activities?url=${encodeURIComponent(momoFundUrl)}`);

      // Check if we got HTML instead of JSON (means API route is not available)
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/json')) {
        throw new Error('API route không khả dụng trong local dev. Dùng "vercel dev" để test API routes.');
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.success && data.activities) {
        setActivities(data.activities);
      } else {
        throw new Error(data.error || 'Failed to parse activities');
      }
    } catch (error) {
      console.error('Error fetching MoMo activities:', error);
      const errorMessage = error instanceof Error ? error.message : 'Không thể tải hoạt động';
      setActivitiesError(errorMessage);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const totalReceived = activities.reduce((sum, activity) => sum + (activity.amount > 0 ? activity.amount : 0), 0);

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
                {formatCurrency(budgetSummary.additionalPerPaxRounded)}
              </p>
              <p className="text-xs text-muted-foreground">
                Dự kiến: {formatCurrency(budgetSummary.additionalPerPax)}
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
              <div className="rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Mỗi người đóng thêm</span>
                  <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
                    {formatCurrency(budgetSummary.additionalPerPaxRounded)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  (Chi phí dự kiến: {formatCurrency(budgetSummary.additionalPerPax)} → làm tròn)
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
                <div className="flex items-center justify-between gap-2 mt-1">
                  <p className="text-lg font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                    {bankInfo.accountNumber}
                  </p>
                  <Button
                    onClick={handleCopyAccountNumber}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                  >
                    {copied === 'account' ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCopyBankInfo}
              variant="secondary"
              className="w-full"
            >
              {copied === 'all' ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Đã copy!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy tất cả thông tin
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Important Note about Excel Update */}
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                📊 Cập nhật chi phí & Sao kê
              </h3>
              <p className="text-base font-medium text-foreground">
                Sẽ gửi file Excel cập nhật chi phí + sao kê chi phí qua thread riêng
              </p>
              <p className="text-sm text-muted-foreground">
                File Excel sẽ bao gồm chi tiết các khoản chi phí thực tế và sao kê ngân hàng để mọi người theo dõi minh bạch.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Payment */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/15 to-purple-500/15">
              <QrCode className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            Quét mã QR để chuyển khoản
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {/* QR Code Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative rounded-xl overflow-hidden bg-white p-2 shadow-xl">
                <img
                  src={paymentQRImage}
                  alt="QR Code thanh toán - Quét bằng app ngân hàng hoặc MoMo"
                  className="w-full max-w-sm mx-auto rounded-lg"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2 max-w-md">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                <span className="text-sm">Mở app ngân hàng hoặc MoMo → Quét QR</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Hỗ trợ: MoMo, VietQR, Napas 247 và tất cả app ngân hàng
              </p>
            </div>

            {/* Quick copy buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button
                onClick={handleCopyAccountNumber}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied === 'account' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Đã copy STK!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy số tài khoản
                  </>
                )}
              </Button>
              <Button
                onClick={handleCopyBankInfo}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied === 'all' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Đã copy!</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-3.5 w-3.5" />
                    Copy thông tin đầy đủ
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MoMo Fund Recent Activities */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/15">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Hoạt động gần đây (MoMo Fund)
            </CardTitle>
            <Button
              onClick={fetchActivities}
              variant="ghost"
              size="sm"
              disabled={loadingActivities}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", loadingActivities && "animate-spin")} />
              <span className="hidden sm:inline">Làm mới</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingActivities ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Đang tải hoạt động...</span>
            </div>
          ) : activitiesError ? (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">Lỗi khi tải hoạt động</p>
                  <p className="text-sm text-muted-foreground mt-1">{activitiesError}</p>
                  <Button
                    onClick={fetchActivities}
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    Thử lại
                  </Button>
                </div>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Chưa có hoạt động nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary */}
              <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Tổng đã nhận</span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalReceived)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activities.length} giao dịch
                </p>
              </div>

              {/* Activities List */}
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div
                    key={`${activity.date}-${activity.name}-${index}`}
                    className={cn(
                      "rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Avatar/Icon */}
                        {activity.icon ? (
                          <img
                            src={activity.icon}
                            alt={activity.name}
                            className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-border"
                            onError={(e) => {
                              // Hide image if it fails to load
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0 border-2 border-border">
                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {activity.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={cn(
                            "text-lg font-bold",
                            activity.amount > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          )}
                        >
                          {activity.amount > 0 ? "+" : ""}
                          {formatCurrency(activity.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activity.amountText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link to MoMo Fund */}
              <div className="pt-2">
                <a
                  href={momoFundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Xem trên MoMo Fund
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { BudgetSection };
