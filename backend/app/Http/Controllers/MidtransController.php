<?php


use Illuminate\Http\Request;
use App\Models\TransactionHeader;
use Midtrans\Notification;
use App\Http\Controllers\Controller;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        $notif = new Notification();

        $order_id = $notif->order_id;
        $status_code = $notif->status_code;
        $transaction_status = $notif->transaction_status;

        // Misal order_id formatnya: ORDER-{id}-timestamp
        $id = explode('-', $order_id)[1];
        $th = TransactionHeader::find($id);

        if (!$th) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if ($transaction_status == 'settlement') {
            $th->status = 'Paid';
        } elseif ($transaction_status == 'pending') {
            $th->status = 'Pending';
        } elseif ($transaction_status == 'expire' || $transaction_status == 'cancel') {
            $th->status = 'Cancelled';
        }

        $th->save();
        return response()->json(['message' => 'Callback handled'], 200);
    }
}

