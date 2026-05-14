"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStuntingRecord, StuntingRecordDetail } from "@/lib/api/stunting";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StuntingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [record, setRecord] = useState<StuntingRecordDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRecord = async () => {
    try {
      setLoading(true);
      const data = await getStuntingRecord(resolvedParams.id);
      setRecord(data);
    } catch (error) {
      toast.error("Gagal memuat detail stunting");
      router.push('/admin/stunting');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  if (loading || !record) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      <div className="flex items-center gap-4">
        <Link href="/admin/stunting">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detail Stunting Tahun {record.year}</h1>
          <p className="text-sm text-muted-foreground">Kelola daftar anak dan program intervensi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-600 text-white">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-emerald-100">Total Didata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record.total_children} Anak</div>
          </CardContent>
        </Card>
        <Card className="bg-rose-600 text-white">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-rose-100">Stunting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record.stunted_children} Anak</div>
          </CardContent>
        </Card>
        <Card className="bg-sky-600 text-white">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-sky-100">Prevalensi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {record.total_children > 0 ? ((record.stunted_children / record.total_children) * 100).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={record.status === 'ditetapkan' ? 'bg-emerald-600' : ''}>
              {record.status.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="children" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="children">Data Anak ({record.children.length})</TabsTrigger>
          <TabsTrigger value="interventions">Program Intervensi ({record.interventions.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="children" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daftar Anak Stunting</CardTitle>
                <CardDescription>Detail sasaran pendataan dan penderita stunting</CardDescription>
              </div>
              <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                <Plus className="h-4 w-4 mr-2" /> Tambah Anak
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Nama Anak</TableHead>
                      <TableHead>Umur (Bulan)</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Status Gizi</TableHead>
                      <TableHead>Dusun</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {record.children.length > 0 ? (
                      record.children.map((child) => (
                        <TableRow key={child.id}>
                          <TableCell className="font-medium">
                            {child.nama_anak}
                            <div className="text-xs text-muted-foreground">{child.nik || 'No NIK'}</div>
                          </TableCell>
                          <TableCell>{child.usia_bulan}</TableCell>
                          <TableCell>{child.jenis_kelamin}</TableCell>
                          <TableCell>
                            <Badge variant={child.status_gizi === 'normal' ? 'outline' : 'destructive'}>
                              {child.status_gizi.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>{child.dusun?.nama || '-'}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-rose-500"><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">Belum ada data anak</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Program Intervensi</CardTitle>
                <CardDescription>Daftar program dan capaian penanganan</CardDescription>
              </div>
              <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                <Plus className="h-4 w-4 mr-2" /> Tambah Program
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Nama Program</TableHead>
                      <TableHead className="text-center">Target</TableHead>
                      <TableHead className="text-center">Realisasi</TableHead>
                      <TableHead className="text-center">Persentase</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {record.interventions.length > 0 ? (
                      record.interventions.map((prog) => {
                        const percent = prog.target > 0 ? Math.round((prog.coverage / prog.target) * 100) : 0;
                        return (
                          <TableRow key={prog.id}>
                            <TableCell className="font-medium">{prog.title}</TableCell>
                            <TableCell className="text-center">{prog.target}</TableCell>
                            <TableCell className="text-center">{prog.coverage}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${percent}%` }} />
                                </div>
                                <span className="text-xs">{percent}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{prog.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="text-rose-500"><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">Belum ada program</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
