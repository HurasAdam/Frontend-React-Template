"use client";

import {
  FileText,
  FolderTree,
  Package,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewArticlePage() {
  const [variants, setVariants] = useState([
    {
      id: 1,
      value: "Przejdź do ustawień konta i wybierz opcję resetowania hasła.",
    },
  ]);

  const [important, setImportant] = useState(false);
  const [visible, setVisible] = useState(false);

  const tags = ["2fa", "logowanie", "zastępstwa", "wycieczki"];

  const addVariant = () =>
    setVariants((prev) => [...prev, { id: Date.now(), value: "" }]);

  const removeVariant = (id: number) =>
    setVariants((prev) => prev.filter((i) => i.id !== id));

  const updateVariant = (id: number, value: string) =>
    setVariants((prev) => prev.map((i) => (i.id === id ? { ...i, value } : i)));

  return (
    <div className="w-full space-y-6">
      {/* HEADER (jak AddRole/AddUser) */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <FileText size={18} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Nowy artykuł</h1>
          <p className="text-sm text-muted-foreground">Dodaj nowy wpis</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* MAIN */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Podstawowe informacje</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <label className="text-sm font-medium">Tytuł</label>
                <Input className="mt-2" placeholder="Jak zresetować hasło?" />
              </div>

              <div>
                <label className="text-sm font-medium">Opis</label>
                <Textarea
                  className="mt-2"
                  rows={8}
                  placeholder="Treść artykułu..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Warianty odpowiedzi</CardTitle>

              <Button size="sm" onClick={addVariant}>
                <Plus size={16} className="mr-2" />
                Dodaj
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {variants.map((v, idx) => (
                <div key={v.id} className="border rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Wariant #{idx + 1}</p>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeVariant(v.id)}
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </div>

                  <Textarea
                    value={v.value}
                    onChange={(e) => updateVariant(v.id, e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tagi</CardTitle>
            </CardHeader>

            <CardContent>
              <Input placeholder="Dodaj tag..." />

              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SIDEBAR */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ustawienia publikacji</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Package size={16} />
                  Produkt
                </label>

                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crm">świadectwa</SelectItem>
                    <SelectItem value="helpdesk">dotacje</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <FolderTree size={16} />
                  Kategoria
                </label>

                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Konto</SelectItem>
                    <SelectItem value="payments">Płatności</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue="draft">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-xl p-4 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Widoczny</p>
                  <p className="text-xs text-muted-foreground">
                    Publiczny artykuł
                  </p>
                </div>
                <Switch checked={visible} onCheckedChange={setVisible} />
              </div>

              <div className="border rounded-xl p-4 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Priorytetowy</p>
                  <p className="text-xs text-muted-foreground">Promowany</p>
                </div>
                <Switch checked={important} onCheckedChange={setImportant} />
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles size={14} />
                  Podgląd
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  Warianty: {variants.length}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Button className="w-full">Wyślij</Button>
                <Button variant="outline" className="w-full">
                  Zapisz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
